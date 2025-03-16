const Weather = ({ weather }) => {
  return (
    <>
      <p>Temperature {weather.list[0].main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
        alt={weather.list[0].weather[0].description}
      />
      <p>Wind {weather.list[0].wind.speed} m/s</p>
    </>
  );
};

export default Weather;
