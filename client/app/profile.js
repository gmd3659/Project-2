const deleteFavorite = (poke) => {
  
  sendAjax('POST', "/deleteFav", poke, null);
  
  console.dir("Favorite Deleted");
};

let token = {};

const FavoritesList = function(props) {
  console.log(props);
  if(props.pokes.length === 0) {
    return(
      <div className="domoList">
        <h3 className="emptyDomo">No Favorites yet</h3>
      </div>
    );
  }
  
  const favoriteNodes = props.pokes.map(function(poke) {
    return(
      <div key={poke.owner} className="card">
        <img src={poke.image} alt="poke image" class="card-img-top" />
        <div class="card-body">
          <h3 className="domoName">Name: {poke.name} </h3>
          <input type="hidden" name="_csrf" value={token}/>
          <input className="deleteSubmit" type="submit" value="Remove Favorite" onClick={e => {
              e.preventDefault();
              console.log(poke.owner);
              deleteFavorite(poke);
            }
          }/>
        </div>
      </div>
    );
  });
  
  return (
    <div className="domoList">
      <h3>Favorites:</h3>
      {favoriteNodes}
    </div>
  );
};

const loadFavoritesFromServer = () => {
  sendAjax('GET', '/getFavorites', null, (data) => {
    console.log(data);
    ReactDOM.render(
      <FavoritesList pokes={data.pokes}/>, document.querySelector("#favorites")
    );
  });
};

const setup = function() {
  
  ReactDOM.render(
    <FavoritesList pokes={[]} />, document.querySelector("#favorites")
  );
  
  loadFavoritesFromServer();
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    token = result.csrfToken;
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});