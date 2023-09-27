import "./App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Table() {
    // get data on trains for table
    const url = "http://localhost:1337/delayed";

    const [result, setData] = useState([]);

    const fetchInfo = () => { 
        return fetch(url) 
                .then((response) => response.json()) 
                .then((d) => setData(d.data)) 
        }
        useEffect(() => {
            fetchInfo();
        }, []);

        return (
                <div className="styled-table">
                    <table>
                        <tbody>
                        <tr>
                            <th>Train number:</th>
                            <th>Current station:</th>
                            <th>Route:</th>
                            <th>Delay:</th>
                        </tr>
                        {result.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{width: "22vh"}}><Link to="/ticket" state={{ data: data }} className="link">{data.OperationalTrainNumber}</Link></td>
                                    <td style={{width: "23vh"}}>{data.LocationSignature}</td>
                                    <td style={{width: "23vh"}}>{data.FromLocation ? data.FromLocation[0].LocationName + " -> " : ""} {data.ToLocation ? data.ToLocation[0].LocationName : ""}</td>
                                    <td style={{width: "20vh"}}>{outputDelay(data)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            );
        }

        function outputDelay(item) {
            let advertised = new Date(item.AdvertisedTimeAtLocation);
            let estimated = new Date(item.EstimatedTimeAtLocation);
        
            const diff = Math.abs(estimated - advertised);
        
            return Math.floor(diff / (1000 * 60)) + " minutes";
        }
