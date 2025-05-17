require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

// Server Setup
const app = express();
const PORT = process.env.PORT || 3001;

// DB Setup
dbURL = process.env.DB_URL || 'mongodb://localhost:27017';
dbName = process.env.DB_NAME;
dbCollection = process.env.DB_USER_COLL || 'Users';
const client = new MongoClient(dbURL);

app.use(cors({ credentials: true, origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let collection;

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    collection = db.collection(dbCollection);

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
}

app.post('/login', async (req, res) => {
    // get username and password from request body
    const user = req.body.username;
    const password = req.body.password;

    if (user && password) {
        // check database for user
        const result = await collection.findOne({ [process.env.USER_FIELD_NAME]: user });

        // check if username and password match
        if (result !== null && result[process.env.PW_FIELD_NAME] == password) {
            res.json(true);
        } else {
            res.json(false);
        }
    } else {
        res.json(false);
    }

});

main();