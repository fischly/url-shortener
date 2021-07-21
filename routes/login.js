const { Router } = require('express');
const config = require('./config.json');

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const db = require('./database/db');
const getSaltByUsername = require('./util/getSaltByUsername').getSaltByUsername;
const hashPassword = require('./util/hashPassword');


router.post('/:username/:pass', (req, res) => {
    const db = db.getDb();

    const username = req.params.username;
    const password = req.params.password;

    console.log(`Got login try from username ${username} with password ${password}.`);

    getSaltByUsername(username).then(
        salt => {
            const hashedPassword = hashPassword(password, hash);

            const queryText = 'SELECT * FROM users WHERE username = $1 and password = $2';
            const queryValues = [username, hashedPassword];

            db.get(queryText, queryValues, (error, row) => {
                if (error) {
                    console.error('Database error: ', error);
                    res.status(400).send('database error');
                    return;
                }

                if (row) {
                    console.log('row:', row);

                    const token = jwt.sign({username: username}, config.jwtSecret, { expiresIn: 2_592_000 });
                    console.log('token: ', token);
                    console.log('token decoded: ', jwt.decode(token));

                    res.status(200).send(token);
                } else {
                    res.status(401).send('wrong credentials');
                }
                
            });
        },
        error => {
            res.status(401).send('wrong credentials');
            return;
        }
    )
});

