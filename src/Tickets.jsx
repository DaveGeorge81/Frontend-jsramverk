import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const edit = require("./img/edit_icon.png")

const Tickets = () => {

    // const endpoint = "http://localhost:1337/graphql/";
    const endpoint = "https://jsramverk-trains-meda23.azurewebsites.net/graphql";

    const [result, setData] = useState([])

    const queryData = `{ Tickets {
                        id,
                        code,
                        trainnumber,
                        traindate }
                        }`;
    
    const fetchInfo = () => { 
        return fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: queryData })
        })
            .then((response) => response.json())
            .then(d => setData(d.data.Tickets)
            )
    }
        useEffect(() => {
            fetchInfo();
        }, [])
        return (
            <div>
                <Link to="/"><button id="1">Back to map</button></Link>
                <h1>Current tickets:</h1>
                    {result.map((ticket) => {
                        return (
                            <h4 style={{fontSize: '20px'}} key={ticket.id}>{ticket.id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}
                            <Link to="/edit" state={{ ticket: ticket }} className="link"><img src={edit} width="15px" alt="edit"></img></Link></h4>
                        );
                    })}
            </div>
        );
    }
    export default Tickets;
