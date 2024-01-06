import './App.css';
import React, { useState, useEffect, useMemo } from "react";
import debouce from "lodash.debounce";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [delay, setDelay] = useState(0);

  let listToDisplay = countries;

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (searchTerm !== "") {
    listToDisplay = countries.filter((country) => {
      return ((country.name.common).toLowerCase()).includes(searchTerm);
    });
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  // const performSearch = (e) => {
  //   let keyword = (e.target.value).toLowerCase();
  //   const newData = countries.filter((country) => ((country.name.common).toLowerCase()).match(keyword));
  //   console.log(newData)
  //   if(newData){
  //     setCountries(newData);
  //   }
  // }

  // const debounceSearch = (e,time) => {
  //   if(delay !== 0){
  //     clearTimeout(delay);
  //   }
  //   const timer = setTimeout(() => performSearch(e),time);
  //   setDelay(timer);
  // }

  return (
    <div>
      <div className='inp'>
      <input type='text' placeholder='Search for countries...' onChange = {debouncedResults}></input>
    </div>
    <div className="wrapper">
      {listToDisplay.map((country) => (
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
