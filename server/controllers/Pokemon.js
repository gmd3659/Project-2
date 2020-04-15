const getPokemon = (req, res) => {
  res.json([
    { name: 'Charmander', type: 'Fire' },
    { name: 'Squirtle', type: 'Water' },
    { name: 'Bulbasaur', type: 'Grass' },
  ]);
};

const pokepage = (req, res) => {
  
};

module.exports.getPokemon = getPokemon;
module.exports.pokepage = pokepage;
