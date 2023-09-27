import React, { useState, useEffect } from "react";

const Tickets = () => {

    const url = "http://localhost:1337/tickets";

    
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
                <a href="/"><button>Back to map</button></a>
                <h1>Current tickets:</h1>
                    {result.map((ticket, index) => {
                        ticket.id = index
                        return (
                            <h4>{ticket.id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}</h4>
                        );
                    })}
            </div>
        );
    }
    export default Tickets;
