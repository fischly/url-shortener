const cfg = require('../config.json');
const sqlite3 = require('sqlite3').verbose();

let client;

/**
 * Initializes the database using the configuration from config.json and returning a Promise.
 */
function initDb() {
    return new Promise((resolve, reject) => {
        console.log('Initializing the database "' + cfg.database.filename + '"...');

        client = new sqlite3.Database(cfg.database.filename, (error) => {
            if (error) {
                console.error('Error initalizing the database: ', error);
                reject(error);
            }
            resolve(client);
        });
    });
}


/**
 * Returns the database or null, if it has not been initialized yet.
 */
function getDb() {
    if (!client) {
        console.error('Database has not been initalized yet. Please call initDb first.')
        return;
    }

    return client;
}


module.exports = {
    initDb,
    getDb
};
