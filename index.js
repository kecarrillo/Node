const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const mongoose = require('mongoose');

// Connection to db
let DB_URL = 'mongodb://localhost/mongoDb';
mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, () => {
  console.log(`Connected to ${DB_URL} database for lesson`)
});



let app = express();

// Bring in Models
// let Image = require('./models/image');

app.set('appName', 'PhotoStream');
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'pug');

// Set Views Folder
app.use(express.static(path.join(__dirname, 'views')));
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.all('*',(req, resp)=>{
    resp.render('index2', { title: "PhotoStream", datas: [{id: "1", title: "monTitre", author: "Bibi", body: ["monTitre2Tof", "/statics/img/ground.jpg"]},
            {id: "2", title: "monTitre2", author: "Bibi", body: ["monTitre2Tof2", "/statics/img/exercice.jpg"]}]/*photos*/});
});


// Display images from db in home page
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

// // Routes files
let images = require('./routes/images');
let users = require('./routes/users');
app.use('/images', images);
app.use('/users', users);

http .createServer(app)
    .listen(
        app.get('port'),
        () => {
    console.log(`Express.js server ecoutes sur le port ${app.get('port')}`);
} );
