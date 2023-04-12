SET search_path TO CARSHARING_DB;

INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('Gare d''autocars de Sainte-Catherine', 20, ('12345', 'Chemin de Polytechnique', 'Montréal', 'A1B2C3'), (1, 2));
	
INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('Gare d''autocars de Saint-Sauveur', 15, ('4039', 'Rue Notre-Dame', 'Montréal', 'B1C2D3'), (38, -90));
	
INSERT INTO Parking(parkingName, carLimit, parkingAddress, coordinates) 
	VALUES('Gare d''autocars de Champlain', 10, ('2391', 'Rue Sherbrooke', 'Québec', 'C1D2E3'), (20, 20));
	
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
	VALUES('000002', 'Gare d''autocars de Sainte-Catherine', 'REGULAR','HYUNDAI', '2009-12-18', 260, 0, NULL);
	
INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('G010A2', 'Gare d''autocars de Champlain', 'MINIVAN','HONDA', '2019-11-27', 180, 30, NULL);
	
INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('COOKIE', 'Gare d''autocars de Saint-Sauveur', 'HYBRID','FORD', '2010-12-01', 100, 1000, 100);
	
INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('ABC123', 'Gare d''autocars de Saint-Sauveur', 'HYBRID','FORD', '2010-11-09', 90, 13, 200);

INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('MERGUEZ', 'Gare d''autocars de Champlain', 'REGULAR','MERCEDES', '2022-02-20', 180, 13, NULL);
	
INSERT INTO Car(licensePlate, parkingName, modelName, brand, startingDate, gazConsumption, odometer, powerRecharge) 
	VALUES('666666', 'Gare d''autocars de Champlain', 'HYBRID','DACIA', '2010-12-01', 180, 13, 70);
	
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
	VALUES('345678', 'Banque TD');

INSERT INTO BankAccount(idBankAccount, bank)
	VALUES('111111', 'Banque Poly');
	
INSERT INTO CoopMember(idMember, idBankAccount, memberName, preferredParking, memberPassword, licenseNo, entityType,
	birthDate, lastAccidentDate, mailingAddress, email)
	VALUES('1', '123456', 'Gia-Sherwin Ly', 'Gare d''autocars de Sainte-Catherine', 'weak password', 'L123456789101', 'PERSON', '2002-02-21', NULL, ('1234', 'Rue Sherbrooke', 'Montréal', 'D1E2F3'), 'gia@hotmail.com');
	
INSERT INTO CoopMember(idMember, idBankAccount, memberName, preferredParking, memberPassword, licenseNo, entityType,
	birthDate, lastAccidentDate, mailingAddress, email)
	VALUES('2', '234567', 'Haroun Mili', 'Gare d''autocars de Saint-Sauveur', 'better password', 'L101987654321', 'PERSON', '1997-04-10', '2012-11-01', ('2374', 'Rue Sainte-Catherine', 'Montréal', 'E1F2G3'), 'haroun@hotmail.com');
	
INSERT INTO CoopMember(idMember, idBankAccount, memberName, preferredParking, memberPassword, licenseNo, entityType,
	birthDate, lastAccidentDate, mailingAddress, email)
	VALUES('3', '345678', 'Juliette Legault', 'Gare d''autocars de Champlain', 'best password', 'L909876978456', 'PERSON', '2001-11-01', NULL, ('5665', 'Rue de Carillon', 'Québec', 'J9H8N9'), 'juliette@hotmail.com');

INSERT INTO CoopMember(idMember, idBankAccount, memberName, preferredParking, memberPassword, licenseNo, entityType,
	birthDate, lastAccidentDate, mailingAddress, email)
	VALUES('4', '111111', 'Polytechnique', 'Parking Poly', 'polipoly', 'L9090769078050', 'CORPORATION', NULL, '2012-11-01', ('2500', 'Chem. de Polytechnique', 'Montréal', 'H3T1J4'), 'poly@hotmail.com');

INSERT INTO ShareMember(idMember)
	VALUES('1');
	
INSERT INTO CoopShare(idShare, idMember, individualSum)
	VALUES('1', '1', 112);
	
INSERT INTO CarShareMember(idMember)
	VALUES('2');
	
INSERT INTO CarShareMember(idMember)
	VALUES('3');

INSERT INTO CarShareMember(idMember)
	VALUES('4');
	
INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements)
	VALUES(('2023-03-27 12:00:00', '2023-03-27 12:30:00'), '1', 'COOKIE', NULL);
	
INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements)
	VALUES(('2023-03-27 14:00:00', '2023-03-27 18:00:00'), '1', '000002', NULL);
	
INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements)
	VALUES(('2023-03-25 09:00:00', '2023-03-25 12:00:00'), '1', 'G010A2', NULL);
	
INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements)
	VALUES(('2023-01-23 09:00:00', '2023-01-23 12:00:00'), '1', 'G010A2', NULL);
	
INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements)
	VALUES(('2005-01-23 09:00:00', '2005-01-23 12:00:00'), '4', '666666', NULL);
	
INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements, odometerEnd)
	VALUES(('2002-01-23 09:00:00', '2002-01-23 12:00:00'), '4', '666666', NULL, 30);

INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements, odometerEnd)
	VALUES(('1990-01-23 09:00:00', '1990-01-23 12:00:00'), '4', 'POLY00', NULL, 80);