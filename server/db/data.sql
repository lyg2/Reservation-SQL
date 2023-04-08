SET search_path TO CARSHARING_DB;

INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('Parking 1', 20, ROW('12345', 'Chemin de Polytechnique', 'Montréal', 'A1B2C3')::Address, (1, 2));
	
INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('Parking 2', 15, ROW('4039', 'Rue Notre-Dame', 'Montréal', 'B1C2D3')::Address, (38, -90));
	
INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('Parking 3', 10, ROW('2391', 'Rue Sherbrooke', 'Québec', 'C1D2E3')::Address, (20, 20));
	
INSERT INTO Model(modelName, hourlyPrice, kilometerPrice, kilometerLimit)
	VALUES('HYBRID', 20, 5, 200000);
	
INSERT INTO Model(modelName, hourlyPrice, kilometerPrice, kilometerLimit)
	VALUES('REGULAR', 18, 8, 150000);
	
INSERT INTO Model(modelName, hourlyPrice, kilometerPrice, kilometerLimit)
	VALUES('MINIVAN', 22, 6, 180000);

INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('000001', NULL, 'HYBRID','TOYOTA', '1922-02-02', 300, 100, 20);
	
INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('000002', 'Parking 2', 'REGULAR','HYUNDAI', '2009-12-18', 260, 0, NULL);
	
INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('G010A2', 'Parking 1', 'MINIVAN','HONDA', '2019-11-27', 180, 30, NULL);
	
INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('COOKIE', 'Parking 2', 'HYBRID','FORD', '2010-12-01', 180, 13, 60);
	
INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('ABC123', 'Parking 2', 'HYBRID','FORD', '2010-12-01', 180, 13, 60);

INSERT INTO Insurance(idInsurance, insurer)
	VALUES('1', 'TD Assurance');
	
INSERT INTO Insurance(idInsurance, insurer)
	VALUES('2', 'TD Assurance');
	
INSERT INTO Insurance(idInsurance, insurer)
	VALUES('3', 'Desjardins Assurance');
	
INSERT INTO InsuranceHistory(licensePlate, idInsurance, dateStart, dateEnd)
	VALUES('000001', '3', '2012-09-11', NULL);
	
INSERT INTO InsuranceHistory(licensePlate, idInsurance, dateStart, dateEnd)
	VALUES('000001', '2', '2022-01-01', NULL);
	
INSERT INTO InsuranceHistory(licensePlate, idInsurance, dateStart, dateEnd)
	VALUES('G010A2', '2', '2017-03-12', '2018-03-12');
	
INSERT INTO BankAccount(idBankAccount, bank)
	VALUES('123456', 'Tangerine');
	
INSERT INTO BankAccount(idBankAccount, bank)
	VALUES('234567', 'Banque Nationale');
	
INSERT INTO CoopMember(idMember, idBankAccount, memberName, preferredParking, memberPassword, licenseNo, entityType,
	birthDate, lastAccidentDate, mailingAddress, email)
	VALUES('1', '123456', 'Gia-Sherwin Ly', 'Parking 1', '123', '12342', 'PERSON', '2002-02-21', NULL, ROW('1234', 'Rue Sherbrooke', 'Montréal', 'D1E2F3')::Address, 'gia@hotmail.com');
	
INSERT INTO CoopMember(idMember, idBankAccount, memberName, preferredParking, memberPassword, licenseNo, entityType,
	birthDate, lastAccidentDate, mailingAddress, email)
	VALUES('2', '234567', 'Haroun Mili', 'Parking 2', 'password', '67589', 'PERSON', '1999-05-13', '2012-11-01', ROW('2374', 'Rue Sainte-Catherine', 'Montréal', 'E1F2G3')::Address, 'haroun@hotmail.com');
	
INSERT INTO ShareMember(idMember)
	VALUES('1');
	
INSERT INTO CoopShare(idShare, idMember, individualSum)
	VALUES('1', '1', 26);
	
INSERT INTO CarShareMember(idMember, annualMembership)
	VALUES('2', 250);
	
INSERT INTO Bill(idBill, dateBill, dueDate, isPaid, total)
	VALUES('1', '2023-04-02', '2023-04-12', false, 0);
	
INSERT INTO Reservation(reservedPeriod, idMember, idBill, licensePlate, requirements)
	VALUES(('2023-03-27 12:00:00', '2023-03-27 13:00:00'), '1', '1', 'COOKIE', NULL);
	
INSERT INTO Reservation(reservedPeriod, idMember, idBill, licensePlate, requirements)
	VALUES(('2023-03-27 14:00:00', '2023-03-27 18:00:00'), '1', '1', '000002', NULL);
	
INSERT INTO Reservation(reservedPeriod, idMember, idBill, licensePlate, requirements)
	VALUES(('2023-03-25 09:00:00', '2023-03-25 12:00:00'), '1', '1', 'G010A2', NULL);
	
INSERT INTO Reservation(reservedPeriod, idMember, idBill, licensePlate, requirements)
	VALUES(('2023-01-23 09:00:00', '2023-01-23 12:00:00'), '1', '1', 'G010A2', NULL);
	
-- UPDATE Car SET odometer = 200000 WHERE licensePlate = 'COOKIE';

-- UPDATE Reservation SET odometerEnd = 15 WHERE idMember = '1' AND licensePlate = 'COOKIE';