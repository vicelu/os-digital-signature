const fs = require('fs');
const hash = require('./hash.js');
const asymmetric = require('./asymmetric.js');

const privateKey = fs.readFileSync('private_key.txt', 'utf8');
const plaintext = fs.readFileSync('plaintext.txt', 'utf8');
const passphrase = fs.readFileSync('passphrase', 'utf8');

const hashedPlaintext = hash.hash(plaintext);
const encryptedWithPrivateKey = asymmetric.encryptWithPrivateKey(hashedPlaintext, privateKey, passphrase);
const digitalSignature = `Hashed text: ${hashedPlaintext} \n Encrypted text (with private key): ${encryptedWithPrivateKey}` 
fs.writeFileSync('digitalSignature.txt', digitalSignature.toString('utf8'));
console.log('Successfully generated a digital signature!');