import React, { useState, useEffect } from "react";

const Tickets = () => {

    const url = "https://jsramverk-trains-meda23.azurewebsites.net/tickets";

    
    const [result, setData] = useState([])
    
    const fetchInfo = () => { 
        return fetch(url) 
                .then((response) => response.json()) 
                .then((d) => setData(d.data))
        }
        useEffect(() => {
            fetchInfo();
        }, [])
        return (
            <div>
                <a href="/"><button id="1">Back to map</button></a>
                <h1>Current tickets:</h1>
                    {result.map((ticket) => {
                        return (
                            <h4 key={ticket.id}>{ticket.id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}</h4>
                        );
                    })}
            </div>
        );
    }
    export default Tickets;
