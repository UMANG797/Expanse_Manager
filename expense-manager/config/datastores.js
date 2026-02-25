const dotenv = require('dotenv');

dotenv.config();

//Data Sore
module.exports.datastores = {
  default: {
    adapter: 'sails-mongo',
    url: process.env.MONGO_URI,
  },
};
