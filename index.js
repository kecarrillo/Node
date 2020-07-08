const express = require('express');
const http = require('http');
const path = require('path');

let app = express();

app.set('appName', 'PhotoStream');
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'pug');

// Set Views Folder
app.use(express.static(path.join(__dirname, 'views')));

app.all('*',(req, resp)=>{
    resp.render('index', { title: "PhotoStream",/*photos*/});
});


// Routes files
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
