const pokemonCards = require('pokemontcgsdk');
const extraRequest = require('request');

let token = {};

const requestBearerToken = (req, res) => {
  const body = 'grant_type=client_credentials&client_id=80f4290e-727a-4b81-b467-0e764bfb6c5d&client_secret=41df591c-f37e-41ad-8863-cb0c581ac230';
  extraRequest.post('https://api.tcgplayer.com/token', body, { headers: { 'Content-Type': 'text/plain' } })
    .then((response) => {
      token = response.data;
      res.json({ bearerToken: response.data });

    // do more stuff here
    })
    .catch((error) => {
      console.log(error);
    });

  res.json({ bearerToken: 'No token found' });
};

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
module.exports.requestBearerToken = requestBearerToken;
