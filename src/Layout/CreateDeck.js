import React from "react";
import {createDeck} from "../utils/api/index";
import {useHistory} from "react-router-dom";

function CreateDeck() {
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    window.confirm("Are you sure you want to create this deck")
    const name = event.target.querySelector("#name").value;
    const description = event.target.querySelector("#description").value;
    const abortController = new AbortController();
    const deck = {
      "name" : name,
      "description" : description
    };
    createDeck(deck, abortController.signal).then(history.push("/"));
    return () => abortController.abort();
  }

  return (
      <div className="container text-black">
        <h2 className="display-4">Create Deck</h2>
        <form onSubmit={submitHandler}>
          <h4>
            Name
          </h4>
          <br>
          </br>
          <input type="text" id="name" />
          <br>
          </br>
          <h4>
            Description
          </h4>
          <br>
          </br>
          <textarea type="text" id="description" />
        <br>
        </br>
        <div>
          <button >
            Cancel
          </button>
          <button type="submit">
            Submit
          </button>
        </div>
        </form>
      </div>
  );
}

export default CreateDeck;