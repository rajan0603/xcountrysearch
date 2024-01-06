import './App.css';
import React, { useState, useEffect } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const performSearch = (e) => {
    let keyword = (e.target.value).toLowerCase();
    const newData = countries.filter((country) => ((country.name.common).toLowerCase()).match(keyword));
    console.log(newData)
    if(newData){
      setCountries(newData);
    }
  }

  const debounceSearch = (e,time) => {
    if(delay !== 0){
      clearTimeout(delay);
    }
    const timer = setTimeout(() => performSearch(e),time);
    setDelay(timer);
  }

  return (
    <div>
      <div className='inp'>
      <input type='text' placeholder='Search for countries...' onChange = {(e) => debounceSearch(e,500)}></input>
    </div>
    <div className="wrapper">
      {countries.map((country) => (
        <div style={{flexDirection: "column"}} key={country.cca3} className="styleCard">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="cardImg"
          />
          <h2 className="cardText">{country.name.common}</h2>
        </div>
      ))}
    </div>
    </div>
  );
}
