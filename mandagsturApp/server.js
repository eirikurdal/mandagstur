const express = require('express');
const bodyParser = require('body-parser');
const db = require('./js/dbconnect').db;
const fileUpload = require('express-fileupload');
const app = express();
const port = (process.env.PORT || 3000);


const hikes = require('./js/hikes.js');


app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next(); //go to the specified route
});


app.set('port', port);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/hikes/', hikes);


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(app.get('port'), function () {
    console.log('server running', app.get('port'));
});
