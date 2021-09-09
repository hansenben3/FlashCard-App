import React from "react";
import {Link, useParams} from "react-router-dom";

function Navbar ({deck, location}) {
    const {cardId} = useParams();
    if(deck === undefined && location !== null){
            return(
            <nav className="container" aria-label="breadcrumb" >
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="/">
                        Home
                    </a>
                </li>
                <li>
                    
                    {location}
                    
                </li>
                
            </ol>
        </nav>
        )
        
    }
    return (
        <nav className="container" aria-label="breadcrumb" >
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="/">
                        Home
                    </a>
                </li>
                {
                    deck !== undefined && location !== undefined ? 
                    <li className="breadcrumb-item">
                        <Link to={"/decks/" + deck.id}>
                            {deck.name}
                        </Link> 
                        /{cardId ? " " + location + " " + cardId : location}
                    </li>
                    :
                    <li className="breadcrumb-item">
                        {deck.name}
                    </li>
                }
            </ol>
        </nav>
    )
}

export default Navbar;