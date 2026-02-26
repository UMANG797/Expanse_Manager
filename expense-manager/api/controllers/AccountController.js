const crypto=require('crypto');

module.exports = {

  list: async function (req, res) {
    const accounts = await Account.find({
      owner: req.user.userId
    });
    //console.log(accounts);
    return res.view('accounts', { accounts:accounts });
  },

  create: async function (req, res) {
    const { name,amount } = req.body;

  
    if (!name) {
      return res.send('Account name required');
    }
    if(!amount)
    {
      return res.send("give it amount");
    }
    await Account.create({
      name,
      amount:Number(amount),
      owner: req.user.userId
    });

    return res.redirect('/accounts');
  },

  delete: async function (req, res) {
    const { id } = req.params;

    await Account.destroy({
      id,
      owner: req.user.userId
    });

    return res.redirect('/accounts');
  },
  edit: async function (req, res) {
  const { id } = req.params;

  const account = await Account.findOne({
    id,
    owner: req.user.userId
  });

  if (!account) {
    return res.redirect('/accounts');
  }

  return res.view('edit',{layout:false}, { account:account});
},

update: async function (req, res) {
  const { id } = req.params;
  const { name, amount } = req.body;

  if (!name || !amount) {
    return res.send('Name and amount are required');
  }

  await Account.updateOne({
    id,
    owner: req.user.userId
  }).set({
    name,
    amount: Number(amount)
  });

  return res.redirect('/accounts');
},

};
