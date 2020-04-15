const pokemonCards = require('pokemontcgsdk');

const getPokemon = (req, res) => {
  const pokelist = pokemonCards.card.all().on('data', function (card) {console.log(card.name)});
  console.dir(pokelist);

  res.json({ pokemon: pokelist });
};

const pokePage = (req, res) => {
  res.render('pokemon', { csrfToken: req.csrfToken() });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.getPokemon = getPokemon;
module.exports.pokePage = pokePage;
module.exports.getToken = getToken;
