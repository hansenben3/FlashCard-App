import React, {useState} from "react";
import {deleteCard} from "../utils/api";
import {useHistory, useRouteMatch} from "react-router-dom";

function Cards ({cards, type}) {
    const {url} = useRouteMatch();
    const history = useHistory();
    const [index, setIndex] = useState(1);
    const [side, setSide] = useState(true);
    if(cards !== undefined){
    //gonna have to rewrite this entire if statement so that it shows one card front and a button 
    //to click that flips the card then the next card button pops up  card 1/3 data shown as well
    // maybe create a FlashCard component that takes in a card and a true false bool to display front or back
    if(type === "Study"){
        const deckLength = cards.length;
        if(deckLength < 3){
            return (
                <div>
                    <h3>
                        Not enough cards.
                    </h3>
                    <p>
                        You need at least 3 cards to study. There are {deckLength} cards in this deck.
                    </p>
                </div>
            )
        }
        return (
            <ul>
                <li>
                    <div>
                        <h4>
                            Card {index} of {deckLength}
                        </h4>
                        <p>
                            {side === true ? "Front" : "Back"} : {side === true ? cards[index-1].front : cards[index-1].back}
                        </p>
                        <button onClick={(event) => {
                            event.preventDefault();
                            if(side === true){
                                setSide(false); 
                            }
                            else{
                                setSide(true);
                            }
                        }}>
                            Flip
                        </button>
                        {side === false ? <button onClick={(event) => {
                            event.preventDefault();
                            if(index !== deckLength){
                                setSide(true);
                                setIndex((prevValue) => {
                                    return prevValue+=1;
                            }); 
                            }
                            else{
                                if(window.confirm("Do you wish to reset the study session?")){
                                   setSide(true);
                                    setIndex(1); 
                                }
                                else{
                                    history.push("/");
                                }
                                
                            }
                            
                            }}>
                            Next
                            </button> 
                            :
                            null
                        }
                    </div>
                </li>
            </ul>
        )
    }
    return (
        <ul>
            {cards.map((card) => {
                return (
                <li id={card.id}>
                    <div>
                        Front: {card.front} 
                    </div>
                    <div>
                        Back: {card.back}
                    </div>
                    <button onClick={(event) => {
                        event.preventDefault();
                        const id = event.target.parentNode.id;
                        history.push(url + "/cards/" + id + "/edit")
                    }}>
                        Edit
                    </button>
                    <button onClick={(event) => {
                        if(window.confirm("Delete this card?")){
                            event.preventDefault();
                            const abortController = new AbortController();
                            const id = event.target.parentNode.id;

                            deleteCard(id, abortController.signal);

                            return () => abortController.abort();
                        }
                    }}>
                        Trash
                    </button>
                </li>
                )
            })}
        </ul>
    )
        }
}

export default Cards;