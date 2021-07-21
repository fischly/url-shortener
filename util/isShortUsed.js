const getDb = require('../database/db').getDb;

function isShortUsed(short) {
    const db = getDb();

    return new Promise((resolve, reject) => {
        const queryText = 'SELECT short_path FROM shorts WHERE short_path = $1';
        const queryValues = [short]; // parameterized query to avoid sql injections

        db.get(queryText, queryValues, (err, row) => {
            if (err) {
                console.log('DB ERROR: ', err);
                reject('database error');
                return;
            }

            console.log('row:', row);

            if (row) {
                reject('short already in use');
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    isShortUsed
}