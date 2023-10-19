import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

    const TicketsForm = () => {

        // const endpoint = "http://localhost:1337/graphql/";
        const endpoint = "https://jsramverk-trains-meda23.azurewebsites.net/graphql";

        const location = useLocation()
        const train = location.state?.data
        let newTicketId = 0;
        // const url = "https://jsramverk-trains-meda23.azurewebsites.net/codes";

        let options = []
        const [result, setData] = useState([])
        const [ticketCount, setTicket] = useState([])

        const fetchInfo = () => {
            const codesQuery = `{ Codes {
                Code,
                Level1Description,
                Level2Description,
                Level3Description
            }}`;
            return fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ query: codesQuery })
            })
                .then((response) => response.json())
                .then(d => setData(d.data.Codes)
                )
            }
            useEffect(() => {
                fetchInfo();
            }, []);
console.log(result)
            result.map((code) => {
                options.push({
                    label: `${code.Code} - ${code.Level3Description}`,
                    value: `${code.Code}`
                })
                return options
            });

        const [selectedOption, setSelectedOption] = useState("first-option");

        const  handleDropdownChange = (event) => {
            setSelectedOption(event.target.value);
        }

        const ticketInfo = () => {
            const queryTickets = `{ Tickets {
                id,
                code,
                trainnumber,
                traindate }
                }`;
            return fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ query: queryTickets })
            })
                .then((response) => response.json())
                .then(d => setTicket(d.data.Tickets)
                )
            }
            useEffect(() => {
                ticketInfo();
            }, []);

                    var lastId = ticketCount.length;
                    console.log(ticketCount)
                    console.log(lastId)
                    newTicketId = lastId + 1;

        var newTicket = `mutation{addTicket(
            id: ${newTicketId},
            code: "${selectedOption}",
            trainnumber: "${train.OperationalTrainNumber}",
            traindate: "${train.EstimatedTimeAtLocation.substring(0, 10)}"
            ){
                id
                code
                trainnumber
                traindate
            }}`;

        console.log(newTicketId)

    const handleSubmit = () => {
        if (selectedOption !== "first-option") {
            fetch(endpoint, {
                body: JSON.stringify({ query: newTicket }),
                headers: {
                    "content-Type": "application/json"
                },
                method: "POST",
                })
                .then((response) => response.json())
                .then(() => {
                });
        }
    }

    return (
        <form action="/tickets" onSubmit={handleSubmit}>
            <h1>New ticket (#{newTicketId}) for train: {train.OperationalTrainNumber}</h1>
            <h2> From {train.FromLocation ? train.FromLocation[0].LocationName : ""} to {train.ToLocation ? train.ToLocation[0].LocationName : ""}. Right now in {train.LocationSignature}. </h2>
                <div className="pt-0 mb-3">
            <select value={selectedOption} onChange={handleDropdownChange}
            required>
                <option value="first-option">Choose an error code</option>
                {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
            <div className="pt-0 mb-3">
            <button
                className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
                type="submit"
            >
                Commit new ticket
            </button>
            </div>
        </form>
    );
    };

    export default TicketsForm;
