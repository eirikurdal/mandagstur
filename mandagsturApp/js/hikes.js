const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbconnect').db; //database
const fileUpload = require('express-fileupload');
// ---------------------------

router.post('/upload', function (req, res) {
    console.log(req.files.sampleFile);
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`../public/img/test.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        console.log('File opplastet!')
        res.send('File uploaded!');
    });
});


// ADD NEW HIKE---------------
router.post("/add/", async function (req, res) {

    try {
        let title = req.body.title;
        let description = req.body.description;
        let date = req.body.date;
        let isnew = req.body.isnew;

        let query = `INSERT INTO hikes(title, description, date, isnew) VALUES('${title}', '${description}', '${date}', '${isnew}') RETURNING *;`;

        let datarows = await db.any(query);
        console.log(datarows);

        let statusCode = datarows ? 200 : 500;
        console.log("Status: " + statusCode);
        res.status(statusCode).json({
            msg: `Turen ${title} er lagt til.`
        }).end()
    } catch (error) {
        res.status(500).json({
            error: error,
            msg: `Something went wrong: ${error}`
        }); //something went wrong!
        console.log("ERROR: " + error);
    }
});

// GET ALL HIKES ---------------
router.get("/getall/", async function (req, res) {

    try {
        let query = `SELECT * FROM hikes WHERE ACTIVE='true' ORDER BY date ASC`;
        let datarows = await db.any(query);
        console.log(datarows);

        let statusCode = datarows ? 200 : 500;
        console.log("Status: " + statusCode);
        res.status(statusCode).json({
            hikes: datarows
        }).end()
    } catch (error) {
        res.status(500).json({
            error: error
        }); //something went wrong!
        console.log("ERROR: " + error);
    }
});

module.exports = router;
