import React from "react";

export default function Card({character, meaning}){
    return(
        <div>
            <h1>{character}</h1>
            <h4>{meaning}</h4>
        </div>
    )
    
}