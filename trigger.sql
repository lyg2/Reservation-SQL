SET search_path TO CARSHARING_DB;

-- 6) Déclencheur (trigger) qui crée une table ForSale et qui insère les informations d’un véhicule 
-- dès que la valeur d’odomètre spécifique au type de véhicule est atteinte
CREATE FUNCTION check_for_car_sale() RETURNS trigger AS $onCarUpdate$
	DECLARE kilometerLimitModel FLOAT := (SELECT kilometerLimit 
			FROM MODEL NATURAL JOIN Car WHERE licensePlate = NEW.licensePlate);
	BEGIN
		CREATE TABLE IF NOT EXISTS ForSale(
			licensePlate CHAR(6) NOT NULL,
			PRIMARY KEY (licensePlate),
			FOREIGN KEY (licensePlate) REFERENCES Car(licensePlate)
		);
		IF NEW.odometer >= kilometerLimitModel THEN
			INSERT INTO ForSale(licensePlate) VALUES(NEW.licensePlate);
		END IF;
		RETURN NULL;
	END; $onCarUpdate$
LANGUAGE plpgsql;

CREATE TRIGGER checkForCarSale AFTER UPDATE ON Car
FOR EACH ROW EXECUTE FUNCTION check_for_car_sale();

CREATE FUNCTION link_reservation_to_bill() RETURNS trigger AS $onReservationInsert$
	DECLARE billIdCount INT := 
		(SELECT COUNT(idBill) FROM Reservation 
		WHERE idMember=NEW.idMember 
		AND EXTRACT(MONTH FROM(reservedPeriod).periodStart)=EXTRACT(MONTH FROM(NEW.reservedPeriod).periodStart) 
		AND EXTRACT(YEAR FROM(reservedPeriod).periodStart)=EXTRACT(YEAR FROM(NEW.reservedPeriod).periodStart));
		billId INT := (SELECT idBill FROM Reservation 
		WHERE idMember=NEW.idMember 
		AND EXTRACT(MONTH FROM(reservedPeriod).periodStart)=EXTRACT(MONTH FROM(NEW.reservedPeriod).periodStart) 
		AND EXTRACT(YEAR FROM(reservedPeriod).periodStart)=EXTRACT(YEAR FROM(NEW.reservedPeriod).periodStart)
		LIMIT 1);
	BEGIN
		IF billIdCount=0 THEN
			INSERT INTO Bill(dateBill, dueDate)
			VALUES(((NEW.reservedPeriod).periodStart)::DATE, ((NEW.reservedPeriod).periodStart+INTERVAL '30 days')::DATE)
			RETURNING idBill INTO billId;
		END IF;
			NEW.idBill = billId;
		RETURN NEW;
	END; $onReservationInsert$
LANGUAGE plpgsql;

CREATE TRIGGER linkReservationToBill BEFORE INSERT ON Reservation
FOR EACH ROW EXECUTE FUNCTION link_reservation_to_bill();


CREATE FUNCTION set_total() RETURNS trigger AS $onBillInsert$
	BEGIN
		IF NEW.total != 0 THEN
			RAISE EXCEPTION 'Total cannot be different from zero on insert';
		END IF;
		RETURN NEW;
	END; $onBillInsert$
LANGUAGE plpgsql;

CREATE TRIGGER setTotal BEFORE INSERT ON Bill
FOR EACH ROW EXECUTE FUNCTION set_total();


CREATE FUNCTION set_fee() RETURNS trigger AS $onReservationInsert$
	DECLARE 
		hours FLOAT := EXTRACT(HOUR FROM ((NEW.reservedPeriod).periodEnd - (NEW.reservedPeriod).periodStart));
		minutes FLOAT := EXTRACT(MINUTE FROM ((NEW.reservedPeriod).periodEnd - (NEW.reservedPeriod).periodStart));
		floatTime FLOAT;
	BEGIN
		floatTime = hours + (minutes / 60);
		NEW.fee = floatTime * (
		SELECT hourlyPrice FROM MODEL NATURAL JOIN Car WHERE licensePlate = NEW.licensePlate
		);
		RETURN NEW;
	END; $onReservationInsert$
LANGUAGE plpgsql;

CREATE TRIGGER setFee BEFORE INSERT ON Reservation
FOR EACH ROW EXECUTE FUNCTION set_fee();


CREATE FUNCTION add_kilometer_fee_to_total() RETURNS trigger AS $onReservationUpdate$
	DECLARE kilometerPriceModel FLOAT := (SELECT kilometerPrice 
			FROM MODEL NATURAL JOIN Car WHERE licensePlate = NEW.licensePlate);
	BEGIN
		IF NEW.odometerEnd < OLD.odometerStart THEN 
			RAISE EXCEPTION 'OdometerEnd cannot be lower than odometerStart';
		END IF;
		IF NEW.odometerEnd IS NOT NULL THEN
			NEW.fee = OLD.fee + (NEW.odometerEnd - NEW.odometerStart) * (kilometerPriceModel);
			UPDATE Bill SET total = total - OLD.fee + NEW.fee
			WHERE idBill = NEW.idBill;
		END IF;
		RETURN NEW;
	END; $onReservationUpdate$
LANGUAGE plpgsql;

CREATE TRIGGER addKilometerFeeToTotal BEFORE UPDATE ON Reservation
FOR EACH ROW EXECUTE FUNCTION add_kilometer_fee_to_total();


CREATE FUNCTION add_period_fee_to_total() RETURNS trigger AS $onReservationInsert$
	BEGIN
		UPDATE Bill SET total = total + NEW.fee
		WHERE idBill = NEW.idBill;
		RETURN NULL;
	END; $onReservationInsert$
LANGUAGE plpgsql;

CREATE TRIGGER addPeriodFeeToTotal AFTER INSERT ON Reservation
FOR EACH ROW EXECUTE FUNCTION add_period_fee_to_total();


CREATE FUNCTION set_odometer_start() RETURNS trigger AS $onReservationInsert$
	BEGIN
		NEW.odometerStart = (SELECT odometer FROM Car WHERE licensePlate = NEW.licensePlate);
		RETURN NEW;
	END; $onReservationInsert$
LANGUAGE plpgsql;

CREATE TRIGGER setOdometerStart BEFORE INSERT ON Reservation
FOR EACH ROW EXECUTE FUNCTION set_odometer_start();


CREATE FUNCTION set_membership() RETURNS trigger AS $onCarShareMemberInsert$
	DECLARE birthDate Date := (SELECT birthDate FROM CoopMember WHERE idMember=NEW.idMember);
	DECLARE lastAccidentDate Date := (SELECT lastAccidentDate FROM CoopMember WHERE idMember=NEW.idMember);
	DECLARE age INT := (CURRENT_DATE - birthDate) / 360;
	DECLARE yearsSinceLastAccident INT := (CURRENT_DATE - lastAccidentDate) / 360;
	BEGIN
		IF age > 25 AND (yearsSinceLastAccident IS NULL OR yearsSinceLastAccident >= 1) THEN
			NEW.annualMembership = 75;
		ELSE
			NEW.annualMembership = 100;
		END IF;
		RETURN NEW;
	END; $onCarShareMemberInsert$
LANGUAGE plpgsql;

CREATE TRIGGER setMembership BEFORE INSERT ON CarShareMember
FOR EACH ROW EXECUTE FUNCTION set_membership();
