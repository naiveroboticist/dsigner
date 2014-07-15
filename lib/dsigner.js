var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

function readKeyData(keyPath) {
  var keyData = null;
  return fs.readFileSync(keyPath, 'ascii');
}

function createPrivateKeyPath(keyBaseDir, name) {
  return createKeyPath(keyBaseDir, name, 'private');
}

function createPublicKeyPath(keyBaseDir, name) {
  return createKeyPath(keyBaseDir, name, 'public');
}

function createKeyPath(keyBaseDir, name, publicPrivate) {
  return path.join(keyBaseDir, name + "_" + publicPrivate + ".pem");
}

function signMessage(privateKeyData, message) {
  var signer = crypto.createSign('RSA-SHA256');
  signer.update(message);
  return signer.sign(privateKeyData, 'base64');
}

function verifySignature(publicKeyData, message, signature) {
  var verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(message);
  return verifier.verify(publicKeyData, signature, 'base64');
}

function signMessageFor(keyBaseDir, name, message) {
  return signMessage(readKeyData(createPrivateKeyPath(keyBaseDir, name)), message);
}

function verifySignatureFor(keyBaseDir, name, message, signature) {
  return verifySignature(readKeyData(createPublicKeyPath(keyBaseDir, name)),
                         message, signature);
}

exports.signMessage = signMessage;
exports.signMessageFor = signMessageFor;
exports.verifySignature = verifySignature;
exports.verifySignatureFor = verifySignatureFor;
exports.createPrivateKeyPath = createPrivateKeyPath;
exports.createPublicKeyPath = createPublicKeyPath;
