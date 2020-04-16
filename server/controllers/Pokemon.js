const pokemonCards = require('pokemontcgsdk');


const getPokemon = (req, res) => {
  let pokelist = [{}];

  pokemonCards.card.where({ page: 1, pageSize: 30 })
    .then((cards) => {
      pokelist = cards;
      res.json({ pokemon: pokelist });
    });
};

const searchCards = (req, res) => {
  const searchList = [{}];
  
  const term = req.query.search;
  console.dir(term);

  pokemonCards.card.all({ name: term })
    .on('data', (card) => {
      console.log(card.name);
      if (searchList.length < 30) {
        searchList.push(card);
      }
    });
    
    setTimeout(() => {res.json({ pokemon: searchList })}, 2000);
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
