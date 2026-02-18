module.exports = {

  list: async function (req, res) {

    const accountId = req.params.accountId;

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

    return res.view('transactions', {
      account,
      transactions
    });
  },

  create: async function (req, res) {

    const { amount, type, category, transactionDate, accountId } = req.body;

    await Transaction.create({
      amount,
      type,
      category,
      transactionDate,
      account: accountId,
      owner: req.user.userId
    });

    return res.redirect(`/transactions/${accountId}`);
  },

  delete: async function (req, res) {

    const { id } = req.params;

    await Transaction.destroy({
      id,
      owner: req.user.userId
    });

    return res.redirect('back');
  },

  edit: async function(req,res){
    const {id}=req.params;

    const transaction = await Transaction.findOne({
      id,
    })

    if(!transaction)
    {
      return res.send("Transaction is not have");
    }
    return res.view()
  }
};
