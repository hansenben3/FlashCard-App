import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {updateCard, readCard, readDeck} from "../utils/api";

function EditCard() {
  const [deck, setDeck] = useState(undefined);
  const [card, setCard] = useState(undefined);
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const {cardId} = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal).then(setCard).catch(setError);
    return () => abortController.abort();
  }, []);

  if(error){
    return (
      <div>
        There is an error fetching data...
      </div>
    )
  }

  if(card !== undefined){

    while (deck === undefined){
      const abortController = new AbortController();
      readDeck(card.deckId, abortController.signal).then(setDeck).catch(setError);
      return () => abortController.abort();
    }

    const submitHandler = (event) => {
      event.preventDefault();
      const front = event.target.querySelector("#front");
      const back = event.target.querySelector("#back");
      const card = {
        "id" : cardId,
        "front" : front.value,
        "back" : back.value,
        "deckId" : card.deckId,
      }
      const abortController = new AbortController();
      updateCard(card, abortController.signal)
    }

  return (
      <div className="container text-black">
        <h1 className="display-4">Edit Card: </h1>
        <form onSubmit={submitHandler}>
          <label>
            Front:
          </label>
          <br></br>
          <textarea id="front" value={card.front}>
          </textarea>
          <br></br>
          <label>
            Back:
          </label>
          <br></br>
          <textarea id="back" value={card.back}>
          </textarea>
            <button onClick={() => {
              history.push("/decks/" + card.deckId);
            }}>
              Done
            </button>
            <button type="submit">
            Save
            </button>
        </form>
      </div>
  );
  }
  else{
    return (
      <div>
        There is an error displaying data...
      </div>
    )
  }
}

export default EditCard;
