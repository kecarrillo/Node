/**
 * Imports
 * @type {createApplication}
 */
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const crypto = require('crypto');
const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost/mongoDb';

/**
 * Initialisation de l'application
 * @type {*|app}
 */
let app = express();

/**
 * Création du moteur de stockage
 * @type {class}
 */
const storage = new GridFsStorage({
    url: DB_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images'
                };
                resolve(fileInfo);
            });
        });
    }
});

/**
 * Initialisation du stockage
 * @type {Multer|undefined}
 */
const upload = multer({ storage });



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
 * Gestionnaire de récupération des images dans les requêtes HTTP.
 */
let gfs;

/**
 * Connecteur à mongoDb et créateur de la collection d'images
 */
conn.once('open', () => {
    console.log(`Connected to ${DB_URL} database for lesson`);
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});

/**
 * GET request (all)
 */
app.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            res.render('index2', { title: "PhotoStream", files: false });
        } else {
            files.map(file => {
                file.isImage = file.contentType === 'image/jpeg' ||
                    file.contentType === 'image/png';
            });
            res.render('index2', { title: "PhotoStream", files: files });
        }
    });
});

/**
 * GET request (all)
 */
app.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        // Files exist
        return res.json(files);
    });
});

/**
 * GET request (detail)
 */
app.get('/:id', (req, res) => {
    gfs.files.findOne({ filename: req.params.id }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // File exists
        return res.json(file);
    });
});

/**
 * GET request (detail)
 */
app.get('/image/:id', (req, res) => {
    gfs.files.findOne({ filename: req.params.id }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});

/**
 * POST request (upload)
 */
app.post('/add', upload.single('file'), (req, res) => {
    res.redirect('/');
});

/**
 * DELETE request
 */
app.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }

        res.redirect('/');
    });
});






/**
 * Gestion des requêtes HTTP pour la BDD
 */
app.use(methodOverride('_method'));

/**
 * Initialisation du Controller
 */
// let Image = require('./models/image');

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
app.use('/users', require('./routes/users'));
// app.use('/users', users);


/**
 * Parser de Json pour parser les requêtes et réponses HTTP
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Initialisation des sessions
 */
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

/**
 * Gestion des droits des sessions
 */
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

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
