SET search_path TO CARSHARING_DB;

-- 1. Retourne la marque, le modèle et l’emplacement d’origine des véhicules
SELECT  brand, modelName, parkingName
FROM Car
WHERE parkingName IS NOT NULL;

-- 2. Retourne la marque, le modèle et l’emplacement d’origine des véhicules y compris les 
--    marques et modèles qui n’ont pas de localisation
SELECT parkingName, modelName, brand
FROM Car;

-- 3. Retourne les emplacements sans véhicules
(SELECT * FROM Parking)
EXCEPT
(SELECT DISTINCT Parking.*
FROM Parking NATURAL JOIN Car);

-- 4. Retourne tous les véhicules dont le domicile est situé dans la ville de Montréal

SELECT *
FROM Car
WHERE parkingName IN
	(SELECT parkingName 
	FROM Parking 
	WHERE (parkingAddress).city = 'Montréal');

-- 5. Retourne les emplacements et le nombre de voitures hybrides à chaque emplacement 
-- Si on doit retourner toutes les informations des emplacements

SELECT Parking.*, COUNT(modelName) AS hybridCount
FROM Car NATURAL JOIN Parking
WHERE modelName = 'HYBRID'
GROUP BY Parking.parkingName
ORDER BY Parking.parkingName;

-- Si on ne doit pas retourner toutes les informations des emplacements
SELECT parkingName, COUNT(modelName) AS hybridCount
FROM Car
WHERE modelName = 'HYBRID' AND parkingName IS NOT NULL
GROUP BY parkingName
ORDER BY parkingName;

-- 6. Retournez les plaques d’immatriculation des véhicules qui ont été utilisés (pas seulement 
--    réservés)

SELECT DISTINCT licensePlate 
FROM Reservation NATURAL JOIN Route;

-- 7. Retournez toutes les informations des membres (personnes physiques) vivant dans une 
--    ville avec un emplacement qui a des voitures hybrides 


SELECT DISTINCT CoopMember.* 
FROM CoopMember, Parking NATURAL JOIN Car
WHERE entityType = 'PERSON' AND (CoopMember.mailingAddress).city = (Parking.parkingAddress).city
AND Car.modelName = 'HYBRID';

-- 8. Retournez toutes les informations des véhicules à l’emplacement Montréal qui sont libres 
--    le 23/01/2023 à 10 h

SELECT Car.* 
FROM Car NATURAL JOIN Reservation NATURAL JOIN Route
WHERE '2023-01-23 10:00:00' NOT BETWEEN (Route.traveledPeriod).periodStart AND (Route.traveledPeriod).periodEnd;

-- 9. Retournez les plaques d’immatriculation et le nombre de réservations de chaque véhicule 
--    (y compris ceux sans réservation, c’est-à-dire que le nombre de réservations est 0)

SELECT Car.licensePlate, COUNT(Reservation.*) AS reservationCount 
FROM Car NATURAL LEFT OUTER JOIN Reservation
GROUP BY Car.licensePlate;

-- 10. Quel est le véhicule avec la consommation de carburant la plus élevée ? 

SELECT * 
FROM Car 
WHERE gazConsumption = (
	SELECT MAX(gazConsumption)FROM Car
);

-- 11. Retournez la consommation de carburant maximale, moyenne et minimale par catégorie 
--     de véhicule 

SELECT modelName, MAX(gazConsumption) AS maxConsumption, MIN(gazConsumption) AS minConsumption,
AVG(gazConsumption) as avgConsumption
FROM Car
GROUP BY modelName
ORDER BY modelName;

-- 12. Retournez tous les membres qui ont réservé un véhicule à un endroit autre que leur 
--     emplacement d’origine même si le type de véhicule existe à leur emplacement d’origine 

SELECT DISTINCT CoopMember.* 
FROM CoopMember NATURAL JOIN Reservation NATURAL JOIN Car 
WHERE CoopMember.preferredParking != Car.parkingName AND EXISTS (
	SELECT DISTINCT (idMember, modelName, parkingName) FROM CoopMember, Car 
	WHERE preferredParking = parkingName
);