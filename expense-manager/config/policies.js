module.exports.policies = {

  '*': true,

  DashboardController: {
    '*': 'isAuthenticated'
  }

};
