const crypto = require('crypto');
const fs = require('fs');

const plaintext = fs.readFileSync('plaintext.txt', 'utf8');
const passphrase = fs.readFileSync('passphrase', 'utf8');
const publicKey = fs.readFileSync('public_key.txt', 'utf8');
const privateKey = fs.readFileSync('private_key.txt', 'utf8');

function encryptWithPublicKey() {
    const buffer = Buffer.from(plaintext, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    fs.writeFileSync('asymmetricEncrypted.txt', encrypted.toString('base64'));
    console.log('Successfully encrypted the plaintext using asymmetric encryption! Its in the asymmetricEncrypted.txt file.');
}

function encryptWithPrivateKey(pt, pk, pass) {
    const buffer = Buffer.from(!!pt ? pt : plaintext, 'utf8');
    const encrypted = crypto.privateEncrypt({key: !!pk ? pk : privateKey, passphrase: !!pass ? pass : passphrase}, buffer);
    console.log('Successfully encrypted the plaintext using the private key!');
    return encrypted.toString('base64');
}

function decryptWithPrivateKey() {
    const toDecrypt = fs.readFileSync('asymmetricEncrypted.txt', 'utf-8');
    const buffer = Buffer.from(toDecrypt, 'base64');
    const decrypted = crypto.privateDecrypt({key: privateKey, passphrase: passphrase}, buffer);
    fs.writeFileSync('asymmetricDecrypted.txt', decrypted.toString('utf8'));
    console.log('Successfully decrypted the ciphered text using asymmetric decryption! Its in the asymmetricDecrypted.txt file.');
}

function decryptWithPublicKey() {
    const toDecrypt = fs.readFileSync('encryptedWithPrivateKey.txt', 'utf-8');
    const buffer = Buffer.from(toDecrypt, 'base64');
    const decrypted = crypto.publicDecrypt({key: publicKey}, buffer);
    fs.writeFileSync('decryptedWithPublicKey.txt', decrypted.toString('utf8'));
    console.log('Successfully decrypted the ciphered text using asymmetric decryption! Its in the decryptedWithPublicKey.txt file.');
}

// To encrypt, uncomment this
encryptWithPublicKey();
// Decrypt
decryptWithPrivateKey();
//decryptWithPublicKey();
module.exports = {encryptWithPublicKey, encryptWithPrivateKey, decryptWithPrivateKey, decryptWithPublicKey};