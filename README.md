**Pour la base de données :**

- installer PostgresSQL
- créer un utilisateur nommé ``ei_backend_frontend_user`` et avec le mot de passe ``password`` et avec les droits
  superuser
- créer une base de données nommée ``ei_backend_frontend`` avec pour propriétaire l'utilisateur créé précédement
- exécuter le script suivant dans la base de données créée précédement :
  ``create table Ticket(id int primary key, title varchar(100) not null, description text, status varchar(30) not null);``

**Pour démarrer le backend :**

- lancer une invite de commande dans le dossier ``backend``
- exécuter la commande ``npm start``

**Pour démarrer le frontend:**

- lancer une invite de commande dans le dossier ``frontend/frontend``
- exécuter la commande ``npm start``