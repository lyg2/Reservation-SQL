SET search_path TO CARSHARING_DB;

INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('Parking 1', 20, ('12345', 'Chemin de Polytechnique', 'Montréal', 'A1B2C3'), (1, 2));
	
INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('Parking 2', 15, ('4039', 'Rue Notre-Dame', 'Montréal', 'B1C2D3'), (38, -90));
	
INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('Parking 3', 10, ('2391', 'Rue Sherbrooke', 'Québec', 'C1D2E3'), (20, 20));
	
INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('Parking Poly', 10, ('2500', 'Chem. de Polytechnique', 'Montréal', 'H3T1J4'), (50, 70));

INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('ETS Carless', 10, ('1100', 'R. Notre Dame O', 'Montréal', 'H3C1K3'), (120, 20));

INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('Village Inuit Sans Voiture', 6, ('1100', 'R. Village', 'Kuujjuaq', 'J0M1C0'), (0, 0));
	
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
	
INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('666666', 'Parking 3', 'HYBRID','DACIA', '2010-12-01', 180, 13, 70);
	
INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('POLY00', 'Parking Poly', 'REGULAR','CHEVROLET', '2019-11-27', 180, 30, NULL);


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
	
INSERT INTO BankAccount(idBankAccount, bank)
	VALUES('000000', 'Banque Royale');

INSERT INTO BankAccount(idBankAccount, bank)
	VALUES('666666', 'Banque Desjardins');
	
INSERT INTO BankAccount(idBankAccount, bank)
	VALUES('111111', 'Banque Poly');
	
INSERT INTO CoopMember(idMember, idBankAccount, memberName, preferredParking, memberPassword, licenseNo, entityType,
	birthDate, lastAccidentDate, mailingAddress, email)
	VALUES('1', '123456', 'Gia-Sherwin Ly', 'Parking 1', '123', '12342', 'PERSON', '2002-02-21', NULL, ('1234', 'Rue Sherbrooke', 'Montréal', 'D1E2F3'), 'gia@hotmail.com');
	
INSERT INTO CoopMember(idMember, idBankAccount, memberName, preferredParking, memberPassword, licenseNo, entityType,
	birthDate, lastAccidentDate, mailingAddress, email)
	VALUES('2', '234567', 'Haroun Mili', 'Parking 2', 'password', '67589', 'PERSON', '1997-04-10', '2012-11-01', ('2374', 'Rue Sainte-Catherine', 'Montréal', 'E1F2G3'), 'haroun@hotmail.com');

INSERT INTO CoopMember(idMember, idBankAccount, memberName, preferredParking, memberPassword, licenseNo, entityType,
	birthDate, lastAccidentDate, mailingAddress, email)
	VALUES('3', '666666', 'Juliette Legault', 'Parking Poly', 'password', '44444', 'PERSON', '1997-04-10', '2012-11-01', ('2500', 'Jean-Talon E', 'Montréal', 'H2A1T7'), 'juliette@hotmail.com');

INSERT INTO CoopMember(idMember, idBankAccount, memberName, preferredParking, memberPassword, licenseNo, entityType,
	birthDate, lastAccidentDate, mailingAddress, email)
	VALUES('4', '111111', 'Polytechnique', 'Parking Poly', 'polipoly', '66666', 'CORPORATION', NULL, '2012-11-01', ('2500', 'Chem. de Polytechnique', 'Montréal', 'H3T1J4'), 'poly@hotmail.com');

INSERT INTO ShareMember(idMember)
	VALUES('1');
	
INSERT INTO ShareMember(idMember)
	VALUES('3');
	
INSERT INTO ShareMember(idMember)
	VALUES('4');
	
INSERT INTO CoopShare(idShare, idMember, individualSum)
	VALUES('1', '1', 26);
	
INSERT INTO CarShareMember(idMember)
	VALUES('2');
	
INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements)
	VALUES(('2023-03-27 12:00:00', '2023-03-27 12:30:00'), '1', 'COOKIE', NULL);
	
INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements)
	VALUES(('2023-03-27 14:00:00', '2023-03-27 18:00:00'), '1', '000002', NULL);
	
INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements)
	VALUES(('2023-03-25 09:00:00', '2023-03-25 12:00:00'), '1', 'G010A2', NULL);
	
INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements)
	VALUES(('2023-01-23 09:00:00', '2023-01-23 12:00:00'), '1', 'G010A2', NULL);