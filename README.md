dsigner
-------

A set of tools to support digtially signing and verifying messages.

## Installation

    npm install -g dsigner 

## Usage

In all cases, the keys to be used are assumed to be located in the 'keyBaseDir' 
directory and are named "<name>_(public|private).pem" (e.g. bob_private.pem).

    var dsigner = require('dsigner')

    var keyBaseDir = "/etc/pki/keys";
    var theMessage = "The message to be signed";

    var signature = dsigner.signMessageFor(keyBaseDir, 'bob', theMessage);

    var valid = dsigner.verifyMessageFor(keyBaseDir, 'bob', theMessage, signature);

Also provided are two executables that allow you to sign/verify messages:

    $ sign_message bob "the message to sign"
      <the signature>

    $ verify_message bob "the message to sign" <the signature>
      true or false

The location of the key for the programs is determined by the value of the KEY_PATH
environment variable.

## Tests

    npm tests

## Contributing

Do the best you can. Fork it and send pull request.
