import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {Route, Switch} from "react-router-dom";
import Home from  "./Home";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";

function Layout() {

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/decks/new">
          <CreateDeck/>
        </Route>
        <Route path="/decks/:deckId">
          <Deck/>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Layout;
