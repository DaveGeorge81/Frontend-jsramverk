import React, { useRef, useState } from "react";
import Leaflet from "leaflet"
import "leaflet/dist/leaflet.css" 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import markerRetina from "leaflet/dist/images/marker-icon-2x.png"
import { socket } from './socket';

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: markerRetina,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

const MapComponent = () => { 
    const mapRef = useRef();
    const zoom = 5;
    const containerStyle = {
        width: "100vh",
        height: "99.5vh"
    }
    const center = {
        lat: 62.173276,
        lng: 14.942265
    }

    const [markers, setMarkers] = useState([]);

    let allMarkers = [...markers];

    socket.on("message", (data) => {
        if (markers.find(({trainnumber}) => trainnumber === `${data.trainnumber}`)) {
            const index = markers.findIndex((marker) => marker.trainnumber === data.trainnumber);

            allMarkers = [...markers];
            allMarkers[index]= { ...allMarkers[index], position: data.position };
            setMarkers(allMarkers);
        } else {
            allMarkers = [...markers];
            const marker = {
                position: data.position,
                trainnumber: data.trainnumber
            }

            allMarkers.push(marker);
            setMarkers(allMarkers);
        }
    });


    return (
        <MapContainer
            style={containerStyle}
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            ref={mapRef}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker, index) => (
                <MarkerContent
                    key={index}
                    position={marker.position}
                    trainnumber={marker.trainnumber}
                />
            ))}
        </MapContainer>
    );
};

const MarkerContent = (props) => {
    const markerRef = useRef();

    const { position, trainnumber } = props;  

    return <Marker
        position={position}
        trainnumber={trainnumber}
        ref={markerRef}
    >
        <Popup>
            <b>{trainnumber}</b>
        </Popup>
    </Marker>
}

export default MapComponent;
