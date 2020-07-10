/**
 * Imports
 * @type {createApplication}
 */
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const session = require('express-session');

const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost/mongoDb';

/**
 * Initialisation de l'application
 * @type {*|app}
 */
let app = express();

/**
 * Connection to noSQL db (mongoDb)
 * @type {string}
 */

const conn = mongoose.createConnection(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`Connected to ${DB_URL} database for lesson`)
});

/**
 * Initialisation du Controller
 */
 let Image = require('./models/image');

/**
 * Configuration de l'application
 */
app.set('appName', 'PhotoStream');
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'pug');

/**
 * Définition des paths
 */
app.use(express.static(path.join(__dirname, 'views')));
app.use('/images', require('./routes/images'));
// app.use('/users', require('./routes/users'));
// app.use('/users', users);


/**
 * Parser de Json pour parser les requêtes et réponses HTTP
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/',(req, resp)=>{
    resp.render('index2', {title:"PhotoStream"});
});

/**
 * Gestion des droits des sessions
 */
// require('./config/passport')(passport);
// app.use(passport.initialize());
// app.use(passport.session());

/**
 * Lancement de l'application sur la page index
 */
// app.all('/',(req, resp)=>{
//     resp.render('index2',
//         { title: "PhotoStream", datas: [{id: "1", filename: "monTitre", author: "Bibi", body: ["monTitre2Tof", "/statics/img/ground.jpg"]},
//         {id: "2", title: "monTitre2", author: "Bibi", body: ["monTitre2Tof2", "/statics/img/exercice.jpg"]}]
//         });
// });


/**
 * Affichage des images de la BDD dans la vue home
 */
// app.get('/', function(req, res){
//     Image.find({}, function(err, images){
//       if(err){
//         console.log(err);
//       } else {
//         res.render('index', {
//           title:'images',
//           images: images
//         });
//       }
//     });
//   });

/**
 * Initialisation du server sur le port 3001
 */
http .createServer(app)
    .listen(
        app.get('port'),
        () => {
    console.log(`Express.js server ecoutes sur le port ${app.get('port')}`);
} );
