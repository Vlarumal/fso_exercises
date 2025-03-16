import { useState, useEffect } from "react";
import axios from "axios";
import SingleCountry from "./components/SingleCountry";
import Countries from "./components/Countries";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [foundCountries, setFoundCountries] = useState([]);

  useEffect(() => {
    const url =
      "https://studies.cs.helsinki.fi/restcountries/api/all";

    axios.get(url).then((response) => {
      const countriesFromResponse = response.data;
      setCountries(countriesFromResponse);
    });
  }, []);

  const handleChange = (e) => {
    const countriesToFind = e.target.value.toLowerCase();
    setSearchValue(countriesToFind);
    searchCountries(countriesToFind);
  };

  const searchCountries = (countriesToFind) => {
    const filteredCountries = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(countriesToFind);
    });
    if (filteredCountries) {
      setFoundCountries(filteredCountries);
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSearch}>
        find countries{" "}
        <input
          value={searchValue}
          onChange={handleChange}
          autoFocus
        />
      </form>
      <>
        {foundCountries.length === 1 ? (
          <>
            <SingleCountry foundCountry={foundCountries[0]} />
          </>
        ) : foundCountries.length <= 10 ? (
          foundCountries.map((country) => (
            <Countries
              key={country.cca3}
              country={country}
            />
          ))
        ) : (
          <pre>Too many matches, specify another filter</pre>
        )}
      </>
    </>
  );
}

export default App;
