import React, {useState, useEffect} from "react";
import {useRouteMatch, useParams, Link, Switch, Route} from "react-router-dom";
import {readDeck, listCards} from "../utils/api/index";
import AddCard from "./AddCard";
import Cards from "./Cards";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";
import Study from "./Study";
import Navbar from "./Navbar";

function Deck () {
const {url} = useRouteMatch();
const{deckId} = useParams();
const [deck, setDeck] = useState(undefined);
const [cards, setCards] = useState(undefined);
const [error, setError] = useState(undefined);
const trash = () => {
    
}

useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
    listCards(deckId, abortController.signal).then(setCards).catch(setError);

    return () => abortController.abort();
  }, []);

  if(error){
    return (
        <div>
            Error...
        </div>
    )
  }

if(deck !== undefined){
   return (
    <div>
        <Switch>
            <Route path = {url + "/cards/:cardId/edit"}>
                <Navbar deck = {deck} location = "Edit Card"/>
                <EditCard/>
            </Route>
            <Route path = {url + "/cards/new"}>
                <Navbar deck = {deck} location = "Card/New"/>   
                <AddCard deck={deck}/>
            </Route>
            <Route path = {url + "/study"}>
                <Navbar deck = {deck} location = "Study"/>
                <Study deck = {deck}/>
            </Route>
            <Route path = {url + "/edit"}>
                <Navbar deck = {deck} location = "Edit Deck"/>
                <EditDeck deckId = {deckId}/>
            </Route>
            <Route exact path={url}>
                <Navbar deck = {deck}/>
                <h3>
                    {deck.name}
                </h3>
                <p>
                    {deck.name}
                    {deck.description}
                </p>
                <div>
                    <Link to={url + "/edit"}>Edit</Link>
                    <Link to={url + "/study"}>Study</Link>
                    <Link to={url +"/cards/new"}>Add Cards</Link>
                    <button onClick={trash}>
                        Trash
                    </button>
                 </div>
                <div className="cards">
                    <h4>
                        Cards:
                    </h4>
                    <Cards cards ={cards}/>
                </div>
           </Route>
        </Switch>
    </div>
    ) 
}
else{
  return (
    <div>
        Error
    </div>
)  
}


}

export default Deck;