import React, {useState, useEffect} from "react";
import HomeDeck from "./HomeDeck.js";
import { useHistory } from "react-router-dom";
import {listDecks} from "../utils/api/index";

function Home() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks).catch(setError);

    return () => abortController.abort();
  }, []);

  if(error){
    return (
      <div>
        Error: {error}
      </div>
    )
  }


  function getDeck (name) {
    for (let i = 0; i < decks.length; i++){
      if(name === decks[i].name){
        return decks[i];
      }
    }
  }

  const deckList = decks.map((deck) => {
    return (
    <div className="deck border">
      <HomeDeck deck = {deck} getDeck = {getDeck}/>
    </div>
    )
  });

  const createDeck = () => {
    history.push("/decks/new");
  }

  return (
  <div className="container text-black">
      <button onClick={createDeck}>
        + Create Deck
      </button>
      <div className="border p-10 h-50 d-flex flex-column">
          { 
            deckList
          }
      </div>
      
  </div>
  
  )
  
}

export default Home;