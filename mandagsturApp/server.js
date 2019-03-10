const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const db = require('./js/dbconnect').db; //database

const hikes = require('./js/hikes.js');
app.use('/hikes/', hikes);

const port = (process.env.PORT || 3000);


app.set('port', port);
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next(); //go to the specified route
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(app.get('port'), function () {
    console.log('server running', app.get('port'));
});
