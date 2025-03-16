const SingleCountry = ({ foundCountry }) => {
  const country = foundCountry;
  const languages = country.languages;
  const flags = country.flags;

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
    </>
  );
};

export default SingleCountry;
