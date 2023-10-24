import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from './Constants';


const edit = require("./img/edit_icon.png")

function getToken() {
    return sessionStorage.getItem('token');
}

function getApikey() {
    return sessionStorage.getItem('apikey');
}


const Tickets = () => {
    let apiKey = getApikey();
    let token = getToken();

    // const endpoint = `http://localhost:1337/graphql/?api_key${apiKey}`;
    const endpoint = `https://jsramverk-trains-meda23.azurewebsites.net/graphql?api_key${apiKey}`;

    const [result, setData] = useState([])

    const queryData = `{ Tickets {
                        id,
                        code,
                        trainnumber,
                        traindate }
                        }`;
  
const URL = config.url;


    // const url = "https://jsramverk-trains-meda23.azurewebsites.net/tickets";
//     const url = `${URL}/tickets?api_key${apiKey}`;
    
    
    const fetchInfo = () => { 

//         return fetch(url, {headers: {'x-access-token': token}})
//                 .then((response) => response.json()) 
//                 .then((d) => setData(d.data))
//         }

        return fetch(endpoint, {
            method: 'POST',
            headers: {
                'x-access-token': token,
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
