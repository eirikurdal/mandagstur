const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbconnect').db; //database
// ---------------------------


// ADD NEW HIKE---------------
router.post("/add/", async function (req, res) {

    try {
        let title = req.body.title;
        let description = req.body.description;
        let date = req.body.date;
        let isnew = req.body.isnew;

        let query = `INSERT INTO hikes(title, description, date, isnew) VALUES('${title}', '${description}', '${date}', '${isnew}') RETURNING *;`;

        let datarows = await db.any(query);        

        let statusCode = datarows ? 200 : 500;
        console.log("Status: " + statusCode);
        res.status(statusCode).json({
            msg: `Turen ${title} er lagt til.`
        }).end()
    } catch (error) {
        res.status(500).json({
            error: error
        }); //something went wrong!
        console.log("ERROR: " + error);
    }
});

/*

// UPDATE LIST---------------
router.post("/update/list/", utilities.authenticateUser, async function (req, res) {
    try {
        let listElements = req.body;
        let listId = req.get("listId");
        let idCount = req.get("newIdCount");

        let query = `UPDATE lists SET content='${JSON.stringify({listElements:listElements})}', idcount='${idCount}' WHERE id=${listId};`;

        console.log(query);

        let datarows = await db.any(query);

        let statusCode = datarows ? 200 : 500;
        console.log("Status: " + statusCode);
        res.status(statusCode).json({
            msg: `Listen er oppdatert.`
        }).end()
    } catch (error) {
        res.status(500).json({
            error: error
        }); //something went wrong!
        console.log("ERROR: " + error);
    }
});

*/


// GET ALL HIKES ---------------
router.get("/getall/", async function (req, res) {

    try {
        let query = `SELECT * FROM hikes ORDER BY date DESC`;
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
