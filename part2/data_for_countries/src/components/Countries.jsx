import { useState } from "react";
import SingleCountry from "./SingleCountry";

const Countries = ({ country }) => {
  const [showComponent, setShowComponent] = useState(false);

  const handleShow = () => {
    setShowComponent(!showComponent);
  };

  return (
    <>
      <div>
        {country.name.common}{" "}
        <button onClick={handleShow}>
          {showComponent ? "hide" : "show"}
        </button>
        <br />
      </div>
      <div>
        {showComponent && <SingleCountry foundCountry={country} />}
      </div>
    </>
  );
};

export default Countries;
