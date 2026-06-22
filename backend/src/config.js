require('dotenv').config({ path: `${__dirname}/../../.env` });

const config = {
  character: process.env.CHARACTER || 'DefaultCharacter'
};

module.exports = config;
