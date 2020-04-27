"use strict";

var Header = function Header(props) {
  return (/*#__PURE__*/React.createElement("div", {
      className: "header"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "title"
    }, "PokePricer"), /*#__PURE__*/React.createElement("p", null, "Find all the cards your collection needs!"))
  );
};

var NavBar = function NavBar(props) {
  return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("a", {
      href: "/main"
    }, /*#__PURE__*/React.createElement("img", {
      id: "logo",
      src: "/assets/img/Pokeball.png",
      alt: "face logo"
    })), /*#__PURE__*/React.createElement("div", {
      "class": "navlink"
    }, /*#__PURE__*/React.createElement("a", {
      id: "loginButton",
      href: "/profile"
    }, "Profile")), /*#__PURE__*/React.createElement("div", {
      "class": "navlink"
    }, /*#__PURE__*/React.createElement("a", {
      id: "signupButton",
      href: "/signout"
    }, "Sign Out"))))
  );
  /*if (prop.loggedIn === 'true')
  {
    return(
      <div>
        <nav><a href="/main"><img id="logo" src="/assets/img/Pokeball.png" alt="face logo"/></a>
          <div class="navlink"><a id="loginButton" href="/profile">Profile</a></div>
          <div class="navlink"><a id="signupButton" href="/signout">Sign Out</a></div>
        </nav>
      </div>
    );
  }else{
    return(
      <div>
        <nav><a href="/login"><img id="logo" src="/assets/img/Pokeball.png" alt="face logo"/></a>
          <div class="navlink"><a id="loginButton" href="/login">Login</a></div>
          <div class="navlink"><a id="signupButton" href="/signup">Sign up</a></div>
        </nav>
      </div>
    );
  }*/
};

var handleSearch = function handleSearch(e) {
  e.preventDefault();
  sendAjax('GET', '/searchCards', $("#searchForm").serialize(), function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PokeList, {
      pokemon: data.pokemon
    }), document.querySelector("#content"));
  });
  return false;
};

var Search = function Search(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "searchForm",
      name: "searchForm",
      onSubmit: handleSearch,
      action: "/searchCards",
      method: "GET",
      className: "searchForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "search"
    }, "Find any cards: "), /*#__PURE__*/React.createElement("input", {
      id: "search",
      type: "text",
      name: "search",
      placeholder: "Charizard"
    }), /*#__PURE__*/React.createElement("input", {
      className: "searchSubmit",
      type: "submit",
      value: "Search"
    }), /*#__PURE__*/React.createElement("label", {
      "for": "numResults"
    }, "Number of Results:"), /*#__PURE__*/React.createElement("select", {
      id: "numResults",
      name: "numResults"
    }, /*#__PURE__*/React.createElement("option", {
      value: "10",
      selected: true
    }, "10"), /*#__PURE__*/React.createElement("option", {
      value: "25"
    }, "25"), /*#__PURE__*/React.createElement("option", {
      value: "50"
    }, "50"), /*#__PURE__*/React.createElement("option", {
      value: "100"
    }, "100")))
  );
};

var handleFavorite = function handleFavorite(e) {
  e.preventDefault();
  sendAjax('POST', '/addFavorite', $("#cardForm").serialize(), null);
  return false;
};

var PokeList = function PokeList(props) {
  console.log(props.pokemon);

  if (props.pokemon === null || props.pokemon.length === 0) {
    return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "No Pokemon Found"))
    );
  }

  var pokeNodes = props.pokemon.map(function (poke) {
    return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
        id: "cardForm",
        onSubmit: handleFavorite
      }, /*#__PURE__*/React.createElement("h3", {
        name: "name"
      }, poke.name), /*#__PURE__*/React.createElement("img", {
        name: "image",
        src: poke.imageUrl
      }), /*#__PURE__*/React.createElement("input", {
        type: "submit",
        value: "Favorite"
      })))
    );
  });
  return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Pokemon Cards:"), pokeNodes)
  );
};

var loadPokemonFromServer = function loadPokemonFromServer() {
  sendAjax('GET', '/getPokemon', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PokeList, {
      pokemon: data.pokemon
    }), document.querySelector("#content"));
  });
};

var requestBearerToken = function requestBearerToken() {
  sendAjax('GET', '/getBearer', null, function (data) {
    console.log(data.userName);
  });
};

var setup = function setup(csrf) {
  requestBearerToken();
  ReactDom.render( /*#__PURE__*/React.createElement(NavBar, null), document.querySelector("#navbar"));
  ReactDOM.render( /*#__PURE__*/React.createElement(Header, null), document.querySelector("#header"));
  ReactDOM.render( /*#__PURE__*/React.createElement(Search, null), document.querySelector("#search"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PokeList, {
    pokemon: []
  }), document.querySelector("#content"));
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
