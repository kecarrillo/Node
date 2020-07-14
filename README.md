# Groupe:
- Kevin **CARRILLO**
- Pierre-Jean **SINACOUTY**
    
# Consigne:
Créer un site de ***stream de photo***:
- *Stockées sur* **mongodb**
- CRUD *des photos*
- *Affichage avec* **Pug** *et* **express.js**
- **Techno:** Node.js + MongoDb + Express.js + Bootstrap

  ##Modules utilisés: 
  - **nodemon:** synchronisation entre les fichiers js et le navigateur;
  - **stylus:** genre de pug pour le css;
  - **pug:** genre de yaml qui génère le html;
  - **mongodb:** moteur de BDD NoSQL Mongo;
  - **body-parser:** parseur JSON;
  - **express:** express.js;
  - **mongoose:** ORM mongo;
  - **mongoskin:** facilite l'usage de mongodb;
  - **utils.js:** nécessaire à bootstrap;
  - **autoprefixer:** adapte le code css pour les différents navigateurs;
  - **css-loader:** nécessaire à bootstrap;
  - **node-sass:** nécessaire à bootstrap;
  - **postcss-loader:** nécessaire à bootstrap;
  - **sass-loader:** nécessaire à bootstrap;
  - **style-loader:** nécessaire à bootstrap.

# References
- **[Express.js](https://medium.com/hackernoon/the-definitive-guide-to-express-the-node-js-web-application-framework-649352e2ae87)**
- **[Bootstrap](https://getbootstrap.com/)**
- **[Mongodb](https://www.frugalprototype.com/api-mongodb-mongoose-node-js/)**

# Lancer l'application
Dans une console qui pointe sur la racine du projet, saisissez:

    npm run watch

# BDD fictive
Utiliser mongoDb:

    db.createCollection("images")
    <!-- // db.images.insertOne({ title: "ma première image", body:"image" }) -->

# En cas de problème de mise en page
**[Solution](https://stackoverflow.com/questions/48248832/stylesheet-not-loaded-because-of-mime-type?page=2&tab=votes#tab-top)**
