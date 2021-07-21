
const express = require('express');
const router = express.Router();

const getDb = require('../database/db').getDb;
const isShortUsed = require('../util/isShortUsed').isShortUsed;
const checkAuthentication = require('../util/checkAuthentication').checkAuthentication;


router.get('/:short', (req, res) => {
    console.log('hiiii');
    const db = getDb();

    const short = req.params.short;

    const queryText = 'SELECT url FROM shorts WHERE short_path = $1';
    const queryValues = [short];

    db.get(queryText, queryValues, (err, row) => {
        if (err) {
            console.error('database error getting short: ', err);
            res.status(404).send('database error');
            return;
        }

        if (row) {
            console.log('redirecting to url: ', row.url);
            res.redirect(row.url);
            return;
        } else {
            console.log('short not found');
            res.status(404).send('short url not found');
            return;
        }

    });
});

module.exports = router;