module.exports = {
  attributes: {

    amount: {
      type: 'number',
      required: true
    },

    type: {
      type: 'string',
      isIn: ['income', 'expense', 'transfer'],
      required: true
    },

    category: {
      type: 'string',
      required: true
    },

    transactionDate: {
      type: 'ref',
      columnType: 'datetime',
      required: true
    },

    account: {
      model: 'account',
      required: true
    },

    owner: {
      model: 'user',
      required: true
    }

  }
};
