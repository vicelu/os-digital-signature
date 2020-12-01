const crypto = require('crypto')
const fs = require('fs')

const plaintext = fs.readFileSync('plaintext.txt', 'utf8');
const passphrase = fs.readFileSync('passphrase', 'utf8');

function encrypt(toEncrypt, pathToPublicKey) {
    const publicKey = fs.readFileSync(pathToPublicKey, 'utf8')
    const buffer = Buffer.from(toEncrypt, 'utf8')
    const encrypted = crypto.publicEncrypt(publicKey, buffer)
    return encrypted.toString('base64')
}

function decrypt(toDecrypt, pathToPrivateKey) {
    const privateKey = fs.readFileSync(pathToPrivateKey, 'utf8')
    const buffer = Buffer.from(toDecrypt, 'base64')
    const decrypted = crypto.privateDecrypt({key: privateKey.toString(), passphrase: passphrase}, buffer);
    return decrypted.toString('utf8')
}

const encrypted = encrypt(plaintext, 'public_key.txt');
fs.writeFileSync('encrypted.txt', encrypted);
console.log('Successfully encrypted the plaintext using asymmetric encryption!');

const decrypted = decrypt(encrypted, 'private_key.txt');
fs.writeFileSync('decrypted.txt', decrypted);
console.log('Successfully decrypted the plaintext using asymmetric encryption!');
/* 
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(symmetricAlgorithm, key, iv);

cipher.on('readable', () => {
    console.log(cipher.read().toString('hex'));
});

cipher.write('some plain text data to encrypt');
cipher.end(); */