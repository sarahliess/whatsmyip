import { useState, useEffect } from "react";
import "./App.css";
import MyMap from "./components/MyMap";
import Spinner from "./components/Spinner";

function App() {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState("false");

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);
        setLocation(data.location);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("location", location);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>IP-checker</h1>
      <div>
        <h2>Your IP is: {ip && ip}</h2>
      </div>
      {location ? (
        <>{<MyMap location={location} />}</>
      ) : (
        <div>Location could not be detected</div>
      )}
    </div>
  );
}

export default App;
