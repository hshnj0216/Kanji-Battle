import React, {useState} from "react";
import './app.css';
import { subscribeToTimer } from "./api";

export default function App(){
    const [timestamp, setTimeStamp] = useState();

    subscribeToTimer((timestamp) => {
        setTimeStamp(timestamp);
    })
    return(
        <div className="app">
            <div className="app-header">
                <h2>Our awesome drawing app</h2>
            </div>
            <h3>This is the value of the timestamp: {timestamp}</h3>
        </div>
    )
}