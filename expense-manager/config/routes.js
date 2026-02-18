module.exports.routes = {

  'GET /signup': { view: 'signup' },
  'POST /signup': 'AuthController.signup',

  'GET /login': { view: 'login' },
  'POST /login': 'AuthController.login',
  
'GET /dashboard': 'DashboardController.index',
'GET /logout': 'AuthController.logout',

};
