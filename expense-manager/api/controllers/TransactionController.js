module.exports = {

  //listing transactions for a specific account
  list: async function (req, res) {

    const accountId = req.params.accountId;//get account id from url

    const account = await Account.findOne({
      id: accountId,
      owner: req.user.userId
    });

    if (!account) {
      return res.send("Account not found");
    }

    const transactions = await Transaction.find({
      account: accountId
    }).sort('transactionDate DESC');

    //pass the value towards the view
    return res.view('transactions', {
      account,
      transactions
    });
  },

  //creation of transactions
  create: async function (req, res) {

    const { amount, type, category, transactionDate, accountId } = req.body;

    await Transaction.create({
      amount,
      type,//enum value (income, expense, transfer)
      category,
      transactionDate,
      account: accountId,
      owner: req.user.userId
    });
    //redirection to transactions page of the same account after creation
    return res.redirect(`/transactions/${accountId}`);
  },

  delete: async function (req, res) {

    const { id } = req.params;

    await Transaction.destroy({
      id,
      owner: req.user.userId
    });

    //redirection to previous page after deletion
    return res.redirect('back');
  },
edit: async function (req, res) {
  const { id } = req.params;

  
  const transaction = await Transaction.findOne({
    id,
    owner: req.user.userId
  });

  if (!transaction) {
    return res.redirect('/dashboard');
  }

  return res.view('edit-transaction', { transaction });
},

update: async function (req, res) {
  const { id } = req.params;
  const { amount, category, type } = req.body;

  if (!amount || !category || !type) {
    return res.send('All fields are required');
  }

  await Transaction.updateOne({
    id,
    owner: req.user.userId
  }).set({
    amount: Number(amount),
    category,
    type
  });

  return res.redirect('/accounts');
},

};
