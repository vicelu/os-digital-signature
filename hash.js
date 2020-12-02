const crypto = require('crypto');
const fs = require('fs');

const plaintext = fs.readFileSync('plaintext.txt', 'utf8');
const algorithm = 'sha256';

function hash() {
    const hash = crypto.createHash(algorithm);
    hash.update(plaintext);
    fs.writeFileSync('hash.txt', hash.digest('hex'));
    console.log('Successfully hashed the plaintext! Its in the hash.txt file.');
}

hash();