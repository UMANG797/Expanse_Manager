const crypto = require('crypto');

module.exports = {
  attributes: {

    accountId: {
      type: 'string',
      unique: true
    },

    name: {
      type: 'string',
      required: true,
    },

    amount: {
      type: 'number',
      required: true
    },

    owner: {
      model: 'user',
      required: true
    }

  },

  beforeCreate(values, proceed) {

    const id = crypto.randomBytes(6).toString('hex'); 
    values.accountId = id;

    return proceed();
  }
};