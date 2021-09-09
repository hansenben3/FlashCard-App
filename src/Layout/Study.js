import React from "react";
import Cards from "./Cards";

function Study({deck}) {
  const sortedCards = deck.cards;

  
  if(sortedCards.length < 3){
    return (
      <div className="container text-black">
        <h2>{deck.name}: Study</h2>
        <h3>
          Not enough cards.
        </h3>
        <p>
          You need at least 3 cards to study. There are {sortedCards.length} cards in this deck.
        </p>
      </div>
    )
  }else{

  }
  return (
      <div className="container text-black">
        <h1 className="display-4">{deck.name}: Study</h1>
        <div className="cards">
          <Cards cards = {sortedCards} type="Study"/>
        </div>
      </div>
  );
}

export default Study;