const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // app.post('/delete', mid.requiresLogin, controllers.Domo.)
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.post('/addFavorite', mid.requiresLogin, controllers.Favorites.addFavorite);
  app.get('/getBearer', mid.requiresSecure, controllers.Pokemon.requestBearerToken);
  app.get('/getPokemon', mid.requiresSecure, controllers.Pokemon.getPokemon);
  app.get('/loggedIn', mid.requiresSecure, controllers.Account.checkLoggedIn);
  app.get('/pokePage', mid.requiresSecure, controllers.Pokemon.pokePage);
  app.get('/searchCards', mid.requiresSecure, controllers.Pokemon.searchCards);
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  app.get('/login', mid.requiresSecure, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.make);
  app.get('/', mid.requiresSecure, controllers.Pokemon.pokePage);
};

module.exports = router;
