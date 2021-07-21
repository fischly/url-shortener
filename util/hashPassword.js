const crypto = require('crypto');

function hashPassword(password, salt) {
    let hash = crypto.createHmac('sha512', salt); // create hashing function
    hash.update(password);
    let hashedPassword = hash.digest('hex');

    return hashedPassword;
}

module.exports = {
    hashPassword
}
