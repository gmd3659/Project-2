const handleDomo = (e) => {
  e.preventDefault();
  
  $("#domoMessage").animate({width:'hide'}, 350);
  
  if($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoLevel").val() == '') {
    handleError('RAWR! All fields are required');
    return false;
  }
  
  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function(){
    loadDomosFromServer();
  });
  
  return false;
};

const deleteFavorite = (domo) => {
  
  //sendAjax('POST', "/maker", null, domo);
  
  console.dir("Domo Deleted");
};

const FavoritesList = function(props) {
  if(props.pokes.length === 0) {
    return(
      <div className="domoList">
        <h3 className="emptyDomo">No Favorites yet</h3>
      </div>
    );
  }
  
  const favoriteNodes = props.pokes.map(function(domo) {
    return(
      <div key={pokes._id} class="card" style="width 20rem;">
        <img src={pokes.image} alt="poke image" class="card-img-top" />
        <div class="card-body">
          <h3 className="domoName">Name: {poke.name} </h3>
          <input className="deleteSubmit" type="submit" value="Remove Favorite" onClick=""/>
        </div>
      </div>
    );
  });
  
  return (
    <div className="domoList">
      <h3>Favorites:</h3>
      {pokeNodes}
    </div>
  );
};

const loadFavoritesFromServer = () => {
  sendAjax('GET', '/getFavorites', null, (data) => {
    ReactDOM.render(
      <PokeList pokes={data.pokes}/>, document.querySelector("#favorites")
    );
  });
};

const setup = function() {
  
  ReactDOM.render(
    <PokeList pokes={[]} />, document.querySelector("#favorites")
  );
  
  loadFavoritesFromServer();
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});