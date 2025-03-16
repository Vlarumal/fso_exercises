import axios from "axios";
import { useState, useEffect } from "react";
import Weather from "./Weather";

const SingleCountry = ({ foundCountry }) => {
  const country = foundCountry;
  const languages = country.languages;
  const flags = country.flags;

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const api_key = import.meta.env.VITE_SOME_KEY;
    const url = `https://api.openweathermap.org/data/2.5/find?q=${country.capital}&appid=${api_key}&units=metric`;

    if (country.capital) {
      axios.get(url).then((response) => {
        const weatherData = response.data;
        console.log("weatherData:", weatherData);
        setWeather(weatherData);
      });
    }
  }, [country.capital]);

  return (
    <>
      <h1>{country.name.common}</h1>
      Capital {country.capital} <br />
      Area {country.area} <br />
      <h2>Languages</h2>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={flags.png}
        alt={flags.alt}
      />
      {weather ? (
        <>
          <h2>Weather in {country.capital}</h2>
          <Weather weather={weather} />
        </>
      ) : (
        <p>Weather is not available</p>
      )}
    </>
  );
};

export default SingleCountry;
