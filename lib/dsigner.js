'use strict'

module.exports = (function () {
  const fs = require('fs')
  const path = require('path')
  const crypto = require('crypto')

  const readKeyData = (keyPath) => {
    return fs.readFileSync(keyPath, 'ascii')
  }

  const createPrivateKeyPath = (keyBaseDir, name) => {
    return createKeyPath(keyBaseDir, name, 'private')
  }

  const createPublicKeyPath = (keyBaseDir, name) => {
    return createKeyPath(keyBaseDir, name, 'public')
  }

  const createKeyPath = (keyBaseDir, name, publicPrivate) => {
    return path.join(keyBaseDir, name + '_' + publicPrivate + '.pem')
  }

  const signMessage = (privateKeyData, message) => {
    let signer = crypto.createSign('RSA-SHA256')
    signer.update(message)
    return signer.sign(privateKeyData, 'base64')
  }

  const verifySignature = (publicKeyData, message, signature) => {
    let verifier = crypto.createVerify('RSA-SHA256')
    verifier.update(message)
    return verifier.verify(publicKeyData, signature, 'base64')
  }

  const signMessageFor = (keyBaseDir, name, message) => {
    return signMessage(readKeyData(createPrivateKeyPath(keyBaseDir, name)), message)
  }

  const verifySignatureFor = (keyBaseDir, name, message, signature) => {
    return verifySignature(readKeyData(createPublicKeyPath(keyBaseDir, name)),
                           message,
                           signature)
  }

  var mod = {
    signMessage: signMessage,
    signMessageFor: signMessageFor,
    verifySignature: verifySignature,
    verifySignatureFor: verifySignatureFor,
    createPrivateKeyPath: createPrivateKeyPath,
    createPublicKeyPath: createPublicKeyPath
  }

  return mod
}())
