module.exports.policies = {

  '*': true,

  DashboardController: {
    '*': 'isAuthenticated'
  },

  AccountController: {
    '*': 'isAuthenticated'
  }

};
