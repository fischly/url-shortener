const getDb = require("../database/db").getDb;

function getSaltByUsername(username) {
  const db = getDb();

  // use parameterized queries to avoid sql injections
  const queryText = "SELECT salt FROM users WHERE username = $1";
  const queryValues = [username];

  return new Promise((resolve, reject) => {
    db.get(queryText, queryValues, (err, row) => {
      if (err) {
        console.log("DB ERROR: ", err);
        reject("There was a database error.");
        return;
      }

      if (row) {
        console.log("reuslting row: ", row);
        resolve(row.salt);
      } else {
        reject("found no user with username " + username);
      }
    });
  });
}

module.exports = {
    getSaltByUsername
};
