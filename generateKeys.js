const crypto = require('crypto')
const fs = require('fs')

const passphrase = fs.readFileSync('passphrase', 'utf8');
const symmetricAlgorithm = 'aes-192-cbc'
const asymmetricAlgorithm = 'aes-256-cbc'

crypto.generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: asymmetricAlgorithm,
    passphrase: passphrase
  }
}, (err, publicKey, privateKey) => {
  if (!!err) { console.error(err); }
  fs.writeFileSync('private_key.txt', privateKey);
  fs.writeFileSync('public_key.txt', publicKey);
  console.log('Successfully generated asymmetric keys!');
});

const symmetricKey = crypto.scryptSync(passphrase, 'salt', 24);
fs.writeFileSync('secret_key.txt', symmetricKey);
console.log('Successfully generated symmetric key!');