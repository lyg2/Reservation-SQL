# TP4 INF3710
**Important : Il faut exécuter les fichiers schema.sql, trigger.sql et data.sql dans l'ordre. Sinon, l'application ne pourra  pas fonctionner correctement.**

**Consignes d'installation et démarrage**

Veuillez vous assurer d'avoir  installer PostgresSQL (la version 15.1.1 est utilisé).
Veuillez vous assurer d'avoir installer NodeJS (la version ^18.15.5)

À partir de la racine du projet:

1- Aller dans le sous répertoire /server et lancer npm install pour installer les dépendances.

2- Aller dans le sous répertoire /client et lancer npm install pour installer les dépendances.

Dans `/server/app/services/database.service.ts`, il y a un attribut connectionConfig.
```
public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "TP4",
    password: "root",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true
  };
```
Modifier le user, database et password en conséquence. 

**Il est nécessaire de lancer pgAdmin4 par la suite et de populer la DB  TP4 en exécutant les scripts schema.sql, trigger.sql puis data.sql dans.**
Ces scripts sql se trouvent dans server/app/db.

Dans ```/server```, il faut exécuter la commande npm start, cela lancera le serveur sur le port ```localhost:3000```.


Dans ```/client```, il faut exécuter la commande npm start, cela lancera le client sur le port ```localhost:4200```.
