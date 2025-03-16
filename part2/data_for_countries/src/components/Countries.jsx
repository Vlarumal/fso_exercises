import { useState } from "react";
import SingleCountry from "./SingleCountry";

const Countries = ({ country }) => {
  const [showComponent, setShowComponent] = useState(false);

  const handleShow = () => {
    setShowComponent(!showComponent);
  };

  return (
    <>
      {country.name.common}{" "}
      <button onClick={handleShow}>
        {showComponent ? "hide" : "show"}
      </button>
      <br />
      {showComponent && <SingleCountry foundCountry={country} />}
    </>
  );
};

export default Countries;
