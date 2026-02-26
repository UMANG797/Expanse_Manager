//Account model

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    amount:{
      type:'number',
      required:true
    },
    accountNumber: {
      type: 'string',
      unique: true,
      required: true,
    },
    owner: {
      model: 'user',
      required: true
    }
  }
};
