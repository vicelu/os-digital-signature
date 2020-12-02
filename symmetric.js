const crypto = require('crypto');
const fs = require('fs');

const plaintext = fs.readFileSync('plaintext.txt', 'utf8');
const key = fs.readFileSync('secret_key.txt');
const algorithm = 'aes-192-cbc';
const iv = crypto.randomBytes(16);

function encrypt() {
    const encrypt = crypto.createCipheriv(algorithm, key, iv);
    var encrypted = encrypt.update(plaintext, 'utf8', 'hex');
    encrypted += encrypt.final('hex');
    fs.writeFileSync('symmetricEncrypted.txt', encrypted);
    console.log('Successfully encrypted the plaintext using symmetric encryption! Its in the symmetricEncrypted.txt file.');
}

function decrypt() {
    const toDecrypt = fs.readFileSync('symmetricEncrypted.txt', 'utf-8');
    const decrypt = crypto.createDecipheriv(algorithm, key, iv);
    var decrypted = decrypt.update(toDecrypt, 'hex', 'utf8');
    decrypted += decrypt.final('utf8');
    fs.writeFileSync('symmetricDecrypted.txt', decrypted);
    console.log('Successfully decrypted the ciphered text using symmetric decryption! Its in the symmetricDecrypted.txt file.');
}

encrypt();
decrypt();