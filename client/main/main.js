const Header = (props) => {
  return(
    <div className="header">
      <h1 className="title">PokePricer</h1>
      <p>Find all the cards your collection needs!</p>
    </div>
  );
};


const PokeList = (props) => {
  console.log(props.pokemon);
  if(props.pokemon === null){
    return(
      <div>
        <h3>No Pokemon Found</h3>
      </div>
    );
  }
  
  const pokeNodes = props.pokemon.map((poke) => {
      return(
        <div>
          <h3>{poke.name}</h3>
        </div>
      );
  });
  
  return(
    <div>
      <h1>My Favorite Pokemon!</h1>
      {pokeNodes}
    </div>
  );
};

const loadPokemonFromServer = () => {
  sendAjax('GET', '/getPokemon', null, (data) => {
    ReactDOM.render(
      <PokeList pokemon={data.pokemon}/>, document.querySelector("#pokemon")
    );
  });
};

const setup = function(csrf) {
  
  ReactDOM.render(
    <Header />, document.querySelector("#header")
  );
  
  ReactDOM.render(
    <PokeList pokemon={[]} />, document.querySelector("#pokemon")
  );
  
  loadPokemonFromServer();
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});