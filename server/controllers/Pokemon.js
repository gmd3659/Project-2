const pokemonCards = require('pokemontcgsdk');

const getPokemon = (req, res) => {
  let pokelist = [];

  pokemonCards.card.where({ page: 1, pageSize: 30})
  .then(cards => {
      pokelist = cards;
      res.json({ pokemon: pokelist });
  });
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
