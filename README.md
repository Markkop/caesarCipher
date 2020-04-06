# :unlock: caesarCipher script

This script gets a secret message from a given endpoint, deciphers it and returns it back as a Form Data content.

## Dependencies

- [NodeJS and NPM](https://nodejs.org/en/)
- Git

## How to use

Duplicate `.env.example` file and rename it to `.env`.\
Then provide your token and the GET and POST urls you wish to use

```bash
# Check if NodeJS and NPM are installed
node --version
npm --version

# Clone this repository
git clone https://github.com/Markkop/caesarCipher.git
cd caesarCipher

# Install dependencies
npm install

# Run script
npm start

# Run tests
npm test
```
