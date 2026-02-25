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
    owner: {
      model: 'user',
      required: true
    }

  }
};
