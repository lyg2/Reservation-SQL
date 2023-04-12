DROP SCHEMA IF EXISTS CARSHARING_DB CASCADE;
CREATE SCHEMA CARSHARING_DB;

SET search_path TO CARSHARING_DB;

CREATE DOMAIN LATITUDE AS FLOAT
	CHECK (VALUE BETWEEN -90 AND 90);
	
CREATE DOMAIN LONGITUDE AS FLOAT
	CHECK (VALUE BETWEEN -180 AND 180);
	
CREATE DOMAIN CARTYPE AS VARCHAR(7)
	CHECK (VALUE IN ('HYBRID','REGULAR','MINIVAN'));
	
CREATE DOMAIN ENTITY AS VARCHAR(7)
	CHECK (VALUE IN ('CORPORATION','PERSON'));
	
CREATE DOMAIN POSITIVE_INTEGER AS INT
	CHECK (VALUE >= 0);
	
CREATE DOMAIN ADDRESS_NO AS VARCHAR(5)
	CHECK (LENGTH(VALUE) BETWEEN 4 AND 5);

CREATE TYPE COORD AS (
	xAxis LONGITUDE,
	yAxis LATITUDE
);

CREATE TYPE PERIOD_TIMESTAMP AS (
	periodStart TIMESTAMP,
	periodEnd TIMESTAMP
);

CREATE TYPE ADDRESS AS (
	addressNo ADDRESS_NO,
	street VARCHAR(30),
	city VARCHAR(30),
	postalCode CHAR(6)
);

CREATE TABLE IF NOT EXISTS Parking(
	parkingName VARCHAR(30) NOT NULL,
	carLimit INT NOT NULL,
	parkingAddress ADDRESS NOT NULL,
	coordinates COORD NOT NULL,
	PRIMARY KEY (parkingName)
);

CREATE TABLE IF NOT EXISTS Model(
	modelName CARTYPE NOT NULL,
	hourlyPrice FLOAT NOT NULL,
	kilometerPrice FLOAT NOT NULL,
	kilometerLimit INT NOT NULL,
	PRIMARY KEY (modelName)
);

ALTER TABLE Model ADD CONSTRAINT hourlyPriceConstraint CHECK (hourlyPrice>0);
ALTER TABLE Model ADD CONSTRAINT kilometerPriceConstraint CHECK (kilometerPrice>0);
ALTER TABLE Model ADD CONSTRAINT kilometerLimitConstraint CHECK (kilometerLimit>0);

CREATE TABLE IF NOT EXISTS Car(
	licensePlate CHAR(6) NOT NULL,
	parkingName VARCHAR(30),
	modelName CARTYPE NOT NULL,
	brand VARCHAR(30) NOT NULL,
	startingDate DATE NOT NULL,
	gazConsumption INT NOT NULL,
	odometer INT,
	powerRecharge INT,
 	PRIMARY KEY (licensePlate),
	FOREIGN KEY (parkingName) REFERENCES Parking(parkingName),
	FOREIGN KEY (modelName) REFERENCES Model(modelName)
);

ALTER TABLE Car ADD CONSTRAINT powerRechargeConstraint CHECK 
((powerRecharge>0 AND powerRecharge IS NOT NULL AND modelName='HYBRID') OR 
 (powerRecharge IS NULL AND modelName!='HYBRID'));
ALTER TABLE Car ADD CONSTRAINT gazConsumptionConstraint CHECK (gazConsumption>0);
ALTER TABLE Car ADD CONSTRAINT odometerConstraint CHECK (odometer>=0);

CREATE TABLE IF NOT EXISTS Insurance(
	idInsurance VARCHAR(10) NOT NULL,
	insurer VARCHAR(30) NOT NULL,
	PRIMARY KEY (idInsurance)
);

CREATE TABLE IF NOT EXISTS InsuranceHistory(
	licensePlate CHAR(6) NOT NULL,
	idInsurance VARCHAR(10) NOT NULL,
	dateStart DATE NOT NULL,
	dateEnd DATE,
	PRIMARY KEY (licensePlate, idInsurance),
	FOREIGN KEY (licensePlate) REFERENCES Car(licensePlate),
	FOREIGN KEY (idInsurance) REFERENCES Insurance(idInsurance)
);

ALTER TABLE InsuranceHistory ADD CONSTRAINT dateConstraint CHECK (dateEnd>=dateStart);

CREATE TABLE IF NOT EXISTS BankAccount(
	idBankAccount VARCHAR(10) NOT NULL,
	bank VARCHAR(30) NOT NULL,
	PRIMARY KEY (idBankAccount)
);

CREATE TABLE IF NOT EXISTS CoopMember(
	idMember VARCHAR(10) NOT NULL,
	idBankAccount VARCHAR(10) NOT NULL,
	memberName VARCHAR(60) NOT NULL,
	preferredParking VARCHAR(30),
	memberPassword VARCHAR(20) NOT NULL,
	licenseNo VARCHAR(16),
	entityType ENTITY NOT NULL,
	birthDate DATE,
	lastAccidentDate DATE,
	mailingAddress ADDRESS NOT NULL,
	email VARCHAR(30) NOT NULL,
	PRIMARY KEY (idMember),
	FOREIGN KEY (idBankAccount) REFERENCES BankAccount(idBankAccount),
	FOREIGN KEY (preferredParking) REFERENCES Parking(parkingName)
);

ALTER TABLE CoopMember ADD CONSTRAINT birthDateConstraint CHECK 
((entityType='CORPORATION' AND birthDate IS NULL) OR 
 (entityType='PERSON' AND birthDate IS NOT NULL));

CREATE TABLE IF NOT EXISTS ShareMember(
	idMember VARCHAR(10) NOT NULL,
	PRIMARY KEY (idMember),
	FOREIGN KEY (idMember) REFERENCES CoopMember(idMember)
);

CREATE TABLE IF NOT EXISTS CoopShare(
	idShare VARCHAR(10) NOT NULL,
	idMember VARCHAR(10),
	individualSum FLOAT NOT NULL,
	PRIMARY KEY (idShare),
	FOREIGN KEY (idMember) REFERENCES ShareMember(idMember)
);

ALTER TABLE CoopShare ADD CONSTRAINT sumConstraint CHECK (individualSum>0);

CREATE TABLE IF NOT EXISTS CarShareMember(
	idMember VARCHAR(10) NOT NULL,
	annualMembership INT NOT NULL DEFAULT 0,
	PRIMARY KEY (idMember),
	FOREIGN KEY (idMember) REFERENCES CoopMember(idMember)
);

ALTER TABLE CarShareMember ADD CONSTRAINT membershipConstraint CHECK (annualMembership>0);

CREATE TABLE IF NOT EXISTS Bill(
	idBill VARCHAR(10) NOT NULL,
	dateBill DATE NOT NULL,
	dueDate DATE NOT NULL,
	isPaid BOOL NOT NULL,
	total FLOAT DEFAULT 0 NOT NULL,
	PRIMARY KEY (idBill)
);

ALTER TABLE Bill ADD CONSTRAINT billDateConstraint CHECK (dueDate>=dateBill);
ALTER TABLE Bill ADD CONSTRAINT totalConstraint CHECK (total>=0);

CREATE TABLE IF NOT EXISTS Reservation(
	reservedPeriod PERIOD_TIMESTAMP NOT NULL,
	idMember VARCHAR(10) NOT NULL,
	licensePlate CHAR(6) NOT NULL,
	requirements TEXT,
	idBill VARCHAR(10),
	fee FLOAT DEFAULT 0 NOT NULL,
	odometerStart INT DEFAULT 0 NOT NULL,
	odometerEnd INT,
	PRIMARY KEY (reservedPeriod, idMember, licensePlate),
	FOREIGN KEY (idMember) REFERENCES CoopMember(idMember),
	FOREIGN KEY (licensePlate) REFERENCES Car(licensePlate),
	FOREIGN KEY (idBill) REFERENCES Bill(idBill)
);

ALTER TABLE Reservation ADD CONSTRAINT periodConstraint 
CHECK ((reservedPeriod).periodStart < (reservedPeriod).periodEnd);
ALTER TABLE Reservation ADD CONSTRAINT feeConstraint CHECK (fee>=0);
ALTER TABLE Reservation ADD CONSTRAINT odometerStartConstraint CHECK (odometerStart>=0);

