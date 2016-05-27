'use strict'

const expect = require('chai').expect
const dsigner = require('../lib/dsigner')
const sinon = require('sinon')
const crypto = require('crypto')

describe('dsigner', function () {
  describe('.createPrivateKeyPath', function () {
    it('should generate a valid private key path given a base path and name', function () {
      let keyPath = dsigner.createPrivateKeyPath('/root', 'key_name')

      expect(keyPath).to.equal('/root/key_name_private.pem')
    })
  })

  describe('.createPublicKeyPath', function () {
    it('should generate a valid public key path given a base path and name', function () {
      let keyPath = dsigner.createPublicKeyPath('/root', 'key_name')

      expect(keyPath).to.equal('/root/key_name_public.pem')
    })
  })

  describe('.signMessage', function () {
    it('should actually perform the crypto signing of the message', function () {
      let signer = {}
      signer.update = function () {}
      signer.sign = function () {}

      let createSign = sinon.stub(crypto, 'createSign').withArgs('RSA-SHA256').returns(signer)
      let signerUpdate = sinon.stub(signer, 'update').withArgs('the message')
      let signerSign = sinon.stub(signer, 'sign').withArgs('key data', 'base64').returns('the_signature')

      let signature = dsigner.signMessage('key data', 'the message')

      expect(signature).to.equal('the_signature')
      expect(createSign.called)
      expect(signerUpdate.called)
      expect(signerSign.called)
    })
  })

  describe('.verifySignature', function () {
    it('should actually perform the crypto verification of the signature', function () {
      let verifier = {}
      verifier.update = function () {}
      verifier.verify = function () {}

      let createVerify = sinon.stub(crypto, 'createVerify').withArgs('RSA-SHA256').returns(verifier)
      let verifierUpdate = sinon.stub(verifier, 'update').withArgs('the message')
      let verifierVerify = sinon.stub(verifier, 'verify').withArgs('key data', 'signature', 'base64').returns(true)

      let result = dsigner.verifySignature('key data', 'the message', 'signature')

      expect(result).to.equal(true)
      expect(createVerify.called)
      expect(verifierUpdate.called)
      expect(verifierVerify.called)
    })
  })
})
