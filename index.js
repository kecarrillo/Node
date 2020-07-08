const express = require('express');
const http = require('http');
const path = require('path');

let app = express();

app.set('appName', 'PhotoStream');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'pug');

app.use(express.static('views/statics'));

app.all('*',(req, resp)=>{
    resp.render('index', { title: "PhotoStream",/*photos*/});
});

http .createServer(app)
    .listen(
        app.get('port'),
        () => {
    console.log(`Express.js server ecoutes sur le port ${app.get('port')}`);
} );
