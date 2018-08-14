/*
*
*  Things to add to Database:
* ----------------------------
*  Custom prefix.
*  Custom Roast adding.
*  Custom Meme adding.
*  When you level up stil send the command that they did but then do the level up thing.
*  Make it so people cannot spam Roast-Bot commands to get more XP.
*
*/
const mLabHidden_file = require("mLabKey.json");
const MongoClient = require('mongodb').MongoClient;

const MONGO_URL = URL;


MongoClient.connect(MONGO_URL, (err, db) => {
    if (err) {
        return console.log(err);
    }

    // Do something with db here, like inserting a record
    db.collection('notes').insertOne(
        {
            title: 'Hello MongoDB',
            text: 'Hopefully this works!'
        },
        function (err, res) {
            if (err) {
                db.close();
                return console.log(err);
            }
            db.close();
        }
    )
});