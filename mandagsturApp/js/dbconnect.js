const pgp = require('pg-promise')();
//db connect string
const db = pgp(process.env.DATABASE_URL || 'postgres://gyqpcejnvdoldq:3c8c6a220b67a08e0e387b87285a44302c0d641aca40c8f6bb8badbc49809fc7@ec2-54-247-85-251.eu-west-1.compute.amazonaws.com:5432/d8765ihigeqthb?ssl=true');

//export module
module.exports.db = db; //db connection