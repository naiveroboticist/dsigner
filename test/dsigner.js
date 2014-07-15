var expect = require('chai').expect;
var dsigner = require('../lib/dsigner');
var sinon = require('sinon');
var crypto = require('crypto');
var fs = require('fs');

describe("dsigner", function() {
  describe(".createPrivateKeyPath", function() {

    it("should generate a valid private key path given a base path and name", function() {
      var keyPath = dsigner.createPrivateKeyPath("/root", "key_name");

      expect(keyPath).to.equal("/root/key_name_private.pem");
    });

  });

  describe(".createPublicKeyPath", function() {

    it("should generate a valid public key path given a base path and name", function() {
      var keyPath = dsigner.createPublicKeyPath("/root", "key_name");

      expect(keyPath).to.equal("/root/key_name_public.pem");
    });

  });

  describe(".signMessage", function() {

    it("should actually perform the crypto signing of the message", function() {
      var signer = {};
      signer.update = function() {};
      signer.sign = function() {};

      var createSign = sinon.stub(crypto, "createSign").withArgs('RSA-SHA256').returns(signer);
      var signerUpdate = sinon.stub(signer, "update").withArgs("the message");
      var signerSign = sinon.stub(signer, "sign").withArgs("key data", "base64").returns("the_signature");

      var signature = dsigner.signMessage("key data", "the message");

      expect(signature).to.equal("the_signature");
      expect(createSign.called);
      expect(signerUpdate.called);
      expect(signerSign.called);
    });
  });

  describe(".verifySignature", function() {

    it("should actually perform the crypto verification of the signature", function() {
      var verifier = {};
      verifier.update = function() {};
      verifier.verify = function() {};

      var createVerify = sinon.stub(crypto, "createVerify").withArgs('RSA-SHA256').returns(verifier);
      var verifierUpdate = sinon.stub(verifier, "update").withArgs("the message");
      var verifierVerify = sinon.stub(verifier, "verify").withArgs("key data", "signature", 'base64').returns(true);

      var result = dsigner.verifySignature("key data", "the message", "signature");

      expect(result).to.equal(true);
      expect(createVerify.called);
      expect(verifierUpdate.called);
      expect(verifierVerify.called);
    });
  });
});
