import React from "react";
import { useHistory } from "react-router-dom";
import {deleteDeck} from "../utils/api/index";

function HomeDeck ({deck, getDeck}) {

    const history = useHistory();

    const viewDeck = (event) => {
        const deck = getDeck(event.target.parentNode.querySelector("h2").innerText)
        history.push("/decks/" + deck.id)
    }

    const studyDeck = (event) => {
        const deck = getDeck(event.target.parentNode.querySelector("h2").innerText)
        history.push("/decks/" + deck.id + "/study");
    }

    const trash = (event) => {
        window.confirm("Are you sure you want to delete this deck?");
        const abortController = new AbortController();
        deleteDeck(deck.id, abortController.signal);
        return () => abortController.abort();
    }

    return (
    <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch">
      <div className="border p-4 h-100 d-flex flex-column">
        <h2 className="font-weight-lighter flex-fill">
            {deck.name}
        </h2>
        <p>{deck.cards.length} cards</p>
        <p>
            {deck.description}
        </p>
        <button onClick={viewDeck}>
            View
        </button>
        <button onClick={studyDeck}>
            Study
        </button>
        <button onClick={trash}>
            Trash
        </button>
      </div>
    </article>
    )
    };
  
  export default HomeDeck;