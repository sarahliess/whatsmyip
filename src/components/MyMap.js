import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import { stamenToner } from "pigeon-maps/providers";
import "./MyMap.css";

export default function MyMap({ location }) {
  const [show, setShow] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [countryDetails, setCountryDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      await fetch(`https://restcountries.com/v3.1/alpha/${location.country}`)
        .then((res) => res.json())
        .then((data) => {
          setCountryDetails(data[0]);
          setIsLoading(false);
          console.log("fetch worked", data[0]);
          console.log("loading", isLoading);
        });
    };
    fetchCountryInfo();
  }, [location]);
  let {
    altSpellings,
    region: region2,
    capital,
    continents,
    currencies,
    flags,
    name,
    population,
    borders,
  } = countryDetails;

  console.log("check countrydetails", countryDetails);
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
          <div className={!showMore ? "country-details" : "hide"}>
            {countryDetails.length !== 0 && !isLoading ? (
              <div className="country-details-inner">
                <img src={flags.png} alt={`${name.common} flag`} />
                {name.common} has got {borders.length} borders in total is
                located in {region2}. The capital of {name.common} is {capital}{" "}
                and has a population of {population} people.
                <br />
              </div>
            ) : (
              "could not find more details"
            )}
          </div>{" "}
          <p onClick={handleShow} className="show-more-text">
            <em>{showMore ? "show more" : "show less"}</em>
          </p>{" "}
          <button onClick={handleButtonClick}>close</button>
        </div>
      </div>
      <div className={!show ? "show-details-button" : "hide"}>
        <button onClick={handleButtonClick}>show details</button>
      </div>
    </>
  );
}
