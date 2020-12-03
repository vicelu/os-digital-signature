const crypto = require('crypto');
const fs = require('fs');

const plaintext = fs.readFileSync('plaintext.txt', 'utf8');
const algorithm = 'sha256';

function hash(pt) {
    const hash = crypto.createHash(algorithm);
    hash.update(!!pt ? pt : plaintext);
    const hashed = hash.digest('hex');
    fs.writeFileSync('hash.txt', hashed);
    console.log('Successfully hashed the plaintext! Its in the hash.txt file.');
    return hashed;
}

module.exports = {hash};