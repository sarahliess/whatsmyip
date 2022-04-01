import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import { stamenToner } from "pigeon-maps/providers";
import "./MyMap.css";

export default function MyMap({ location }) {
  const [show, setShow] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [countryDetails, setCountryDetails] = useState(true);
  let { city, country, lat, lng, region, timezone } = location;

  const handleButtonClick = () => {
    setShow(!show);
  };

  const handleShow = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    //asynchronous operation
    const fetchCountryInfo = async () => {
      await fetch(`https://restcountries.com/v3.1/alpha/${location.country}`)
        .then((res) => res.json())
        .then((data) => {
          setCountryDetails(data[0]);
          console.log("fetch worked", data[0]);
        });
    };
    fetchCountryInfo();
  }, [location]);
  let { altSpellings, capital, continents, currencies, flags, name, borders } =
    countryDetails;

  return (
    <>
      <div className="map-container">
        <Map
          provider={stamenToner}
          height={500}
          defaultCenter={[lat, lng]}
          defaultZoom={11}
        >
          <Marker width={50} anchor={[lat, lng]} />
        </Map>
        <div className={show ? "map-details" : "hide"}>
          <h3>Details</h3>
          <p>City: {city}</p>
          <p>Region: {region}</p>
          <p>Country: {country}</p>
          <p>Timezone: {timezone}</p>

          <p onClick={handleShow} className="show-more-text">
            <em>{showMore ? "show more" : "show less"}</em>
          </p>
          {/* {countryDetails ? (
            <div className={!showMore ? "show-more-info" : "hide"}>
              <p>
                {countryDetails ? "found some" : "nope"}
                {countryDetails.name.common}
                Here's some more interesting information about your location.{" "}
                {name && name.common} has {borders && borders.length} borders.
                The country codes of the countries next to {name && name.common}{" "}
                are{" "}
                {borders &&
                  borders.map((el) => {
                    return { el };
                  })}
              </p>
            </div>
          ) : (
            "nope"
          )} */}

          <button onClick={handleButtonClick}>close</button>
        </div>
      </div>
      <div className={!show ? "show-details-button" : "hide"}>
        <button onClick={handleButtonClick}>show details</button>
      </div>
    </>
  );
}
