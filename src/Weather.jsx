import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const apiKey = "7ea7944836051ac1afd141a1d51e386b";
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      setWeather(data);
      setQuery("");
    } catch (error) {
      console.error(error);
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="input-box">
        <input
          type="text"
          name="search"
          id="search-bar"
          value={query}
          placeholder="Enter city name"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onKeyDown={search}
        />
        <button onClick={fetchData}>Search</button>
      </div>

      {typeof weather.main !== "undefined" ? (
        <div className="weather-box">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="date">{dateBuilder(new Date())}</p>
          <p className="temperature">{Math.round(weather.main.temp)}°C</p>
          <p className="description">{weather.weather[0].main}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Weather;
