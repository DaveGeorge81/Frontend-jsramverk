import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from './Constants';
import { socket } from './socket';
// import { io } from 'socket.io-client';


const edit = require("./img/edit_icon.png")

let lockedTicket = { ticketId: 0 };


const Tickets = () => {

const URL = config.url;

const [ticketList, setTicketList] = useState([]);
// const [currentTicket, setCurrent] = useState();

const main = document.getElementById("root");
let tList = document.createElement("div");

main.appendChild(tList);
// socket = io(URL);

const Button = ({ onClick, children }) => {
    return (
        <div className="unlocked" type="button" onClick={onClick}>
            {children}
        </div>
    );
}

    const lockStatus = (current) => {
        socket.emit("lockSocket", current)
        lockedTicket.ticketId = current;
        };


        const test = () => {
            console.log("hej")
            };

useEffect(
    () => {
        socket.connect();
        socket.on("allTickets", (data) => {
            setTicketList(data);
        })
        
        return () => {
            socket.disconnect();
        }
        },
        []
    )

        return (
        <div>
            <Link to="/"><button id="1">Back to map</button></Link>
            <h1>Current tickets:</h1>
                {ticketList.map((ticket) => {

                    if (ticket.locked && lockedTicket.ticketId === ticket.id) {
                        return (
                            <div className="locked" key={ticket.id}>{ticket.id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}
                            <Link to="/edit" state={{ ticket: ticket }} className="link"><img src={edit} width="15px" alt="edit"></img></Link></div>
                            
                        );
                        }
                    else if (ticket.locked) {
                    return (
                        <div className="locked" key={ticket.id}>{ticket.id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}
                        </div>
                    );
                    }
                    else {
                        return (
                        <Button onClick={() => { lockStatus(ticket.id)} } style={{fontSize: '20px'}} key={ticket.id}>{ticket.id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}
                        </Button>
                        );
                    }
                })}
        </div>
        )

}
    export default Tickets;

// const Tickets = () => {

//     const URL = config.url;

//     const endpoint = `${URL}/graphql`;
//     // const endpoint = "https://jsramverk-trains-meda23.azurewebsites.net/graphql";

//     const [result, setData] = useState([])

//     const queryData = `{ Tickets {
//                         id,
//                         code,
//                         trainnumber,
//                         traindate }
//                         }`;



//     // const url = "https://jsramverk-trains-meda23.azurewebsites.net/tickets";
//     const url = `${URL}/graphql`;
    
    
//     const fetchInfo = () => { 
//         return fetch(endpoint, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             },
//             body: JSON.stringify({ query: queryData })
//         })
//             .then((response) => response.json())
//             .then(d => setData(d.data.Tickets)
//             )
//     }
//         useEffect(() => {
//             fetchInfo();
//         }, [])
//         return (
//             <div>
//                 <Link to="/"><button id="1">Back to map</button></Link>
//                 <h1>Current tickets:</h1>
//                     {result.map((ticket) => {
//                         return (
//                             <h4 style={{fontSize: '20px'}} key={ticket.id}>{ticket.id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}
//                             <Link to="/edit" state={{ ticket: ticket }} className="link"><img src={edit} width="15px" alt="edit"></img></Link></h4>
//                         );
//                     })}
//             </div>
//         );
//     }
//     export default Tickets;
