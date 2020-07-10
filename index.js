const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());

app.all('/',(req, resp)=>{
    resp.render('index2', {title:"PhotoStream" /*photos*/});
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
var images = require('./routes/images');
// let users = require('./routes/users');
app.use('/', images);
// app.use('/users', users);

http .createServer(app)
    .listen(
        app.get('port'),
        () => {
    console.log(`Express.js server ecoutes sur le port ${app.get('port')}`);
} );
