import React, { useState, useEffect } from "react";
import axios from "axios";
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const FlightData = () => {
  const [flightData, setFlightData] = useState([]);

  const handleError = (image) => {
    console.log(image);
    image.target.src =
      "https://placehold.co/150x100/FFFFFF/000000?text=Flight+LOGO&font=roboto";
  };

  const apiUrl =
    "https://fictional-enigma-gw7pwwx7g9pf9rjq-3001.app.github.dev/api/flights";

  const fetchFlightData = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        setFlightData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className=".flex-column ">
      <h1 style={{ marginBottom: "1rem" }}>Flight Data Retrieval</h1>
      <button
        className="btn btn-primary"
        style={{ marginBottom: "1rem" }}
        onClick={fetchFlightData}
      >
        Press me
      </button>
      <h3 style={{ marginBottom: "1rem" }}>Flight Data:</h3>
      <ol className="list-group list-group">
        {flightData.map((flight, index) => (
          <li
            className="list-group-item d-flex justify-content-around align-items-start"
            key={index}
            style={{ paddingBottom: "2rem" }}
          >
            <div className="ms-2 me-auto">
              <img
                id="img"
                src={`https://pics.avs.io/150/100/${flight.airline.iata}.png`}
                onError={handleError}
              ></img>
              <div className="fw-bold">Name: {flight.airline.name} </div>
              <div>
                Arrival :
                {String(
                  new Date(flight.arrival.estimated).toLocaleDateString(
                    "en-US",
                    options
                  )
                )}{" "}
                | Airport: {flight.arrival.airport}
              </div>
              <div>
                Departure :{" "}
                {String(
                  new Date(flight.departure.estimated).toLocaleDateString(
                    "en-US",
                    options
                  )
                )}{" "}
                | Airport: {flight.departure.airport}
              </div>
            </div>
            <span className="badge bg-primary rounded-pill">New</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FlightData;
