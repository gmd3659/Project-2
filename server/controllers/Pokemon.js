const pokemonCards = require('pokemontcgsdk');


const getPokemon = (req, res) => {
  let pokelist = [{}];

  pokemonCards.card.where({ page: 1, pageSize: 20 })
    .then((cards) => {
      pokelist = cards;
      res.json({ pokemon: pokelist });
    });
};

const searchCards = (req, res) => {
  const searchList = [{}];
  const { numResults } = req.query;

  const term = req.query.search;

  pokemonCards.card.all({ name: term })
    .on('data', (card) => {
      if (searchList.length < numResults) {
        searchList.push(card);
      }
    });

  setTimeout(() => { res.json({ pokemon: searchList }); }, 4000);
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
module.exports.searchCards = searchCards;
