"use strict";

var Header = function Header(props) {
  return (/*#__PURE__*/React.createElement("div", {
      "class": "Jumbotron"
    }, /*#__PURE__*/React.createElement("h1", {
      id: "title"
    }, "PokePricer"), /*#__PURE__*/React.createElement("p", null, "Find all the cards your collection needs!"))
  );
};

var PokeList = function PokeList(props) {
  console.log(props.pokemon);

  if (props.pokemon === null) {
    return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "No Pokemon Found"))
    );
  }

  var pokeNodes = props.pokemon.map(function (poke) {
    return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, poke.name))
    );
  });
  return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "My Favorite Pokemon!"), pokeNodes)
  );
};

var loadPokemonFromServer = function loadPokemonFromServer() {
  sendAjax('GET', '/getPokemon', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PokeList, {
      pokemon: data.pokemon
    }), document.querySelector("#pokemon"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Header, null), document.querySelector("#header"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PokeList, {
    pokemon: []
  }), document.querySelector("#pokemon"));
  loadPokemonFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("domoMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
