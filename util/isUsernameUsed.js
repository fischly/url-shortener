const getDb = require('../database/db').getDb;

function isUsernameUsed(username) {
    const db = getDb();

    return new Promise((resolve, reject) => {
        const queryText = 'SELECT username FROM users WHERE username = $1';
        const queryValues = [username]; // parameterized query to avoid sql injections

        db.get(queryText, queryValues, (err, row) => {
            if (err) {
                console.log('DB ERROR: ', err);
                reject('database error');
                return;
            }

            console.log('row:', row);

            if (row) {
                reject('username already in use');
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    isUsernameUsed
}