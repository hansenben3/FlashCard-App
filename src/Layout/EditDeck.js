import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck({deckId}) {
  const [deck, setDeck] = useState(undefined);
  const [error, setError] = useState(undefined);
  const history = useHistory();

  useEffect( (deckId) => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
    return () => abortController.abort();
  }, [])

  const submitHandler = (event) => {
    event.preventDefault();
    const newDeck = {
      name: deck.name,
      description: deck.description,
      id : deckId,
      cards : deck.cards
    };
    const abortController = new AbortController();
    updateDeck(newDeck, abortController.signal).then(history.push("/decks/"+deckId)).catch(setError);
    return () => abortController.abort();
  }

  if(error){
    return (
      <div>
        Error fetching data
      </div>
    )
  }

  if(deck){

    const handleChange = (event) => {
      const { id, value } = event.target;
      setDeck(prevState => ({
        ...prevState,
        [id] : value
      }))

    }

  return (
      <div className="container text-black">
        <h1 className="display-4">
          Edit Deck
        </h1>
        <form onSubmit={submitHandler}>
          <label>
            Name
          </label>
          <br></br>
          <input type="text" value={deck.name} id="name" onChange={handleChange}>
          </input>
          <br></br>
          <label>
            Description
          </label>
          <br></br>
          <textarea type="text" value={deck.description} id="description" onChange={handleChange}>
          </textarea>
          <br></br>
          <button onClick={() => {
            history.push("/decks/" + deck.id)
          }}>
            Cancel
          </button>
          <button type="submit">
          Submit
          </button>
        </form>
      </div>
  );
        }
        else{
          return(
            <div>
              Error loading data
            </div>
          )
        }
}

export default EditDeck;