module.exports.policies = {

  //for all pages
  '*': true,

  //for dashboard and accounts and transactions pages, user must be authenticated
  DashboardController: {
    '*': 'isAuthenticated'
  },

  //for accounts and transactions pages, user must be authenticated
  AccountController: {
    '*': 'isAuthenticated'
  },
  //for transactions pages, user must be authenticated and can be own only
  TransactionController: {
  '*': 'isAuthenticated'
}


};
