const crypto = require('crypto');
const fs = require('fs');

const plaintext = fs.readFileSync('plaintext.txt', 'utf8');
const passphrase = fs.readFileSync('passphrase', 'utf8');
const publicKey = fs.readFileSync('public_key.txt', 'utf8');
const privateKey = fs.readFileSync('private_key.txt', 'utf8');

function encrypt() {
    const buffer = Buffer.from(plaintext, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    fs.writeFileSync('asymmetricEncrypted.txt', encrypted.toString('base64'));
    console.log('Successfully encrypted the plaintext using asymmetric encryption! Its in the asymmetricEncrypted.txt file.');
}

function decrypt() {
    const toDecrypt = fs.readFileSync('asymmetricEncrypted.txt', 'utf-8');
    const buffer = Buffer.from(toDecrypt, 'base64');
    const decrypted = crypto.privateDecrypt({key: privateKey, passphrase: passphrase}, buffer);
    fs.writeFileSync('asymmetricDecrypted.txt', decrypted.toString('utf8'));
    console.log('Successfully decrypted the ciphered text using asymmetric decryption! Its in the asymmetricDecrypted.txt file.');
}

encrypt();
decrypt();