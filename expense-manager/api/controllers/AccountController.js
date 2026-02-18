const crypto=require('crypto');

module.exports = {

  list: async function (req, res) {
    const accounts = await Account.find({
      owner: req.user.userId
    });
    console.log(accounts);
    return res.view('accounts', { accounts:accounts });
  },

  create: async function (req, res) {
    const { name } = req.body;

  
    if (!name) {
      return res.send('Account name required');
    }

    await Account.create({
      name,
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
  }

};
