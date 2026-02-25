module.exports.routes = {

//user-authentication....

//view signup page
'GET /signup': { view: 'signup' },
//handle signup
'POST /signup': 'AuthController.signup',

//view login page
'GET /login': { view: 'login' },
//handle login
'POST /login': 'AuthController.login',
 

//for simple dashboard
'GET /dashboard': 'DashboardController.index',

//logout
'GET /logout': 'AuthController.logout',

//accounts-operations

//fetch accounts
'GET /accounts': 'AccountController.list',

//create accounts
'POST /accounts': 'AccountController.create',

//delete accounts
'GET /accounts/delete/:id': 'AccountController.delete',

//edit accounts
'GET /accounts/edit/:id': 'AccountController.edit',

//update accounts
'POST /accounts/update/:id': 'AccountController.update',

//transactions

//fetch translasactions for a specific account
'GET /transactions/:accountId': 'TransactionController.list',

//createation of transactions
'POST /transactions': 'TransactionController.create',

//delete  transactions
'GET /transactions/delete/:id': 'TransactionController.delete',

//edit transactions
'GET /transactions/edit/:id': 'TransactionController.edit',

//update transactions
'POST /transactions/update/:id': 'TransactionController.update',



};
