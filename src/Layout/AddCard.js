import React from "react";
import {useHistory} from "react-router-dom";
import {createCard} from "../utils/api";

function AddCard({deck}) {

  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const front = event.target.querySelector("#front");
    const back = event.target.querySelector("#back");
    const id = 1;
    const deckId = 1;
    const card = {
      "id" : id,
      "front" : front.value,
      "back" : back.value,
      "deckId" : deckId,
    };
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
            <button onClick={() => {
              history.push("/decks/" + deck.id);
            }}>
              Done
            </button>
            <button type="submit">
              Add Card
            </button>
          </form>
        </div>
      </div>
  );
}

export default AddCard;
