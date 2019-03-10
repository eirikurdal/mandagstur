const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbconnect').db; //database
// ---------------------------

/*
// ADD NEW LIST---------------
router.post("/add/", utilities.authenticateUser, async function (req, res) {

    try {
        let listTitle = req.body.listTitle;
        let userId = req.get("userId");

        let query = `INSERT INTO lists(title, owner) VALUES('${listTitle}', '${userId}') RETURNING id, title, content, owner;`;

        let datarows = await db.any(query);
        
        let listId = datarows[0].id;
        let contributorQuery = `UPDATE lists SET contributors = array_append(contributors, ${userId}) WHERE id=${listId}`;
        let updateContributors = await db.any(contributorQuery);

        let statusCode = datarows ? 200 : 500;
        console.log("Status: " + statusCode);
        res.status(statusCode).json({
            msg: `Ny liste laget. Listenavn: ${listTitle}.`
        }).end()
    } catch (error) {
        res.status(500).json({
            error: error
        }); //something went wrong!
        console.log("ERROR: " + error);
    }
});

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
