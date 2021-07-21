
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const getDb = require('../database/db').getDb;
const getSaltByUsername = require('../util/getSaltByUsername').getSaltByUsername;
const isShortUsed = require('../util/isShortUsed').isShortUsed;
const checkAuthentication = require('../util/checkAuthentication').checkAuthentication;


router.post('/:short/:long', (req, res) => {
    const db = getDb();

    const short = req.params.short;
    const long = req.params.long;

    const authorization = req.header('Authorization');
    console.log('authorization: ', authorization);

    const token = checkAuthentication(authorization);

    if (!token) {
        res.status(400).send('unauthenticated');
        return;
    }

    console.log('authenticated with:', token);

    addShortEntry(token.username, long, short).then(
        success => res.status(200).json(success),
        error => res.status(400).json(error)
    );
});

function addShortEntry(username, long, short) {
    const db = getDb();

    return new Promise((resolve, reject) => {
        if (short === undefined) {
            // TODO: generate token
            console.error('not implemented yet');
            reject({ error: 'not implemented yet, you have to specify a short address' });
        }

        isShortUsed(short).then(
            () => {
                console.log('short not already used');

                const queryText = 'INSERT INTO shorts (short_path, url, username) VALUES ($1, $2, $3)';
                const queryValues = [short, long, username];

                db.run(queryText, queryValues, (err, row) => {
                    if (err) {
                        console.error('database error inserting short');
                        reject({ error: 'database error inserting short' });
                    }

                    confirm.log('successfully inserted, row: ', row);
                    resolve({ success: 'successfully inserted short "' + short + '" to "' + long + '"' });
                });
            }, 
            (err) => {
                console.log('short already used');
                reject({ error: 'short already used' });
            }
        )
    });
}