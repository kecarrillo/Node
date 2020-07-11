/**
 * Imports
 * @type {createApplication}
 */
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const images = require('./routes/images');
const Image = require('./models/image');

/**
 * Connection à la BDD
 * @type {string}
 */
let DB_URL = 'mongodb://localhost/mongoDb';
mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, () => {
  console.log(`Connected to ${DB_URL} database for lesson`)
});

/**
 * Définition de l'application
 * @type {*|app}
 */
const app = express();

/**
 * Configuration
 */
app.set('appName', 'PhotoStream');
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'pug');

/**
 * Définition du path
 */
app.use(express.static(path.join(__dirname, 'views')));

/**
 * Parseur de JSON
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Initialisation de l'application
 */
app.all('/',(req, resp)=>{
    Image.find({}, function(err, files){
        if(err){
            console.log(err);
        } else {
            console.log(files);
            resp.render('index2', {
                title: "PhotoStream",
                files: files
            });
        }
    });
});

/**
 * Appel des méthodes
 */
app.use('/', images);

// /**
//  * Gestion des autorisations
//  */
// let users = require('./routes/users');
// app.use('/users', users);

/**
 * Lancement du server
 */
http .createServer(app)
    .listen(
        app.get('port'),
        () => {
    console.log(`Express.js server ecoutes sur le port ${app.get('port')}`);
} );
