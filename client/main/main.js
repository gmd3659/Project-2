const PokeList = (props) => {
  if(props.pokemon.length === 0){
    return(
      <div>
        <h3>No Pokemon Found</h3>
      </div>
    );
  }
  
  const pokeNodes = props.pokemon.map((pokemon) =>{
      return(
        <div>
          <h3>{props.name} - {props.type}</h3>
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
    <PokeContainer pokemon={[]} />, document.querySelector("#pokemon")
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