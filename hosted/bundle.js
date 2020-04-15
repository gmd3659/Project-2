"use strict";

var PokeList = function PokeList(props) {
  if (props.pokemon.length === 0) {
    return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "No Pokemon Found"))
    );
  }

  var pokeNodes = props.pokemon.map(function (poke) {
    return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, poke.name, " - ", poke.types[0]))
    );
  });
  return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "My Favorite Pokemon!"), pokeNodes)
  );
};

var loadPokemonFromServer = function loadPokemonFromServer() {
  sendAjax('GET', '/getPokemon', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PokeList, {
      pokemon: data.pokemon.cards
    }), document.querySelector("#pokemon"));
  });
};

var setup = function setup(csrf) {
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
