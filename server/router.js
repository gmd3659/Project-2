const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // app.post('/delete', mid.requiresLogin, controllers.Domo.)
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getPokemon', mid.requiresSecure, controllers.Pokemon.getPokemon);
  app.get('/pokemon', mid.requiresSecure, controllers.Pokemon.pokePage);
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
