import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {readDeck, createCard} from "../utils/api";

function AddCard({deckId}) {

  const [cards, setCards] = useState(undefined);
  const [deck, setDeck] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect( (deckId) => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
    fetch("http://localhost:5000/cards").then(setCards).catch(setError);
    return () => abortController.abort();
  }, [])

  if(error){
    return(
      <div>
        Error fetching data...
      <textarea id="front" placeholder="Front side of card">
      </textarea>
      <textarea id="back" placeholder="Back side of card">
      </textarea>
      </div>
    )
  }

  if(deck){

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const front = event.target.querySelector("#front");
    const back = event.target.querySelector("#back");
    const id = cards.length += 1;
    const card = {
      "id" : id,
      "front" : front.value,
      "back" : back.value,
      "deckId" : deckId,
    };
    createCard(deckId, card, abortController.signal).then(Clear(event.target));
  }

  function Clear (target) {
    target.querySelector("#front").value = "";
    target.querySelector("#back").value = "";
  }

  return (
      <div className="container text-black">
        <h1 className="display-4">{deck.name}: Add Card</h1>
        <div>
          <form onSubmit={submitHandler}>
            <label>
              Front:
            </label>
            <br></br>
            <textarea id="front" placeholder="Front side of card">
            </textarea>
            <br></br>
            <label>
              Back:
            </label>
            <br></br>
            <textarea id="back" placeholder="Back side of card">
            </textarea>
            <br></br>
            <Link to={"/decks/" + deckId}>
              Done
            </Link>
            <button type="submit">
              Add Card
            </button>
          </form>
        </div>
      </div>
  );
}
else{
  return ( 
    <div>
      Error displaying data...
      <textarea id="front" placeholder="Front side of card">
      </textarea>
      <textarea id="back" placeholder="Back side of card">
      </textarea>
    </div>
  )
}
}

export default AddCard;
