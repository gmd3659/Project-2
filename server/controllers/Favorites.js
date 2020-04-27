const models = require('../models');

const { Poke } = models;

const profilePage = (req, res) => {
  Poke.PokeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('profile', { csrfToken: req.csrfToken(), pokes: docs });
  });
};

const addFavorite = (req, res) => {
  const pokeData = {
    name: req.body.name,
    id: req.body.id,
    owner: req.session.account._id,
  };

  console.dir(req.body.name);

  const newPoke = new Poke.PokeModel(pokeData);

  const pokePromise = newPoke.save();

  pokePromise.then(() => console.log('promise saved'));

  pokePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This card is already favorited.' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return pokePromise;
};

const getFavorites = (request, response) => {
  const req = request;
  const res = response;

  return Poke.PokeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ pokes: docs });
  });
};

module.exports.profilePage = profilePage;
module.exports.addFavorite = addFavorite;
module.exports.getFavorites = getFavorites;
