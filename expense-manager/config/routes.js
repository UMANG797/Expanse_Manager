module.exports.routes = {

  'GET /signup': { view: 'signup' },
  'POST /signup': 'AuthController.signup',

  'GET /login': { view: 'login' },
  'POST /login': 'AuthController.login',
  
'GET /dashboard': 'DashboardController.index',
'GET /logout': 'AuthController.logout',

'GET /accounts': 'AccountController.list',
'POST /accounts': 'AccountController.create',
'GET /accounts/delete/:id': 'AccountController.delete',


};
