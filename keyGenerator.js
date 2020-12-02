const crypto = require('crypto')
const fs = require('fs')

const passphrase = fs.readFileSync('passphrase', 'utf8');
const asymmetricAlgorithm = 'aes-256-cbc'

function generateAsymmetricKeys() {
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
    console.log('Successfully generated asymmetric keys! They are in the public_key.txt and private_key.txt files.');
  });
}

function generateSymmetricKey() {
  const symmetricKey = crypto.scryptSync(passphrase, 'salt', 24);
  fs.writeFileSync('secret_key.txt', symmetricKey);
  console.log('Successfully generated symmetric key! Its in the secret_key.txt file.');
}

generateAsymmetricKeys();
generateSymmetricKey();