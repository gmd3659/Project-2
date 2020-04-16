const Header = (props) => {
  return(
    <div className="header">
      <h1 className="title">PokePricer</h1>
      <p>Find all the cards your collection needs!</p>
    </div>
  );
};

const handleSearch = (e) => {
  e.preventDefault();
  
  sendAjax('GET', '/searchCards', $("#searchForm").serialize(), (data) => {
    ReactDOM.render(
      <PokeList pokemon={data.pokemon}/>, document.querySelector("#pokemon")
    );
  });
  
  return false;
}

const Search = (props) => {
  return(
    <form id="searchForm"
          name="searchForm"
          onSubmit={handleSearch}
          action="/searchCards"
          method="GET"
          className="searchForm"
    >
    <label htmlFor="search">Find any cards: </label>
    <input id="search" type="text" name="search" placeholder="Charizard" />
    <input className="searchSubmit" type="submit" value="Search"/>
    </form>
  );
};


const PokeList = (props) => {
  console.log(props.pokemon);
  if(props.pokemon === null || props.pokemon.length === 0){
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
          <img href={poke.imageURL} ></img>
        </div>
      );
  });
  
  return(
    <div>
      <h1>Pokemon Cards:</h1>
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
    <Search />, document.querySelector("#search")
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