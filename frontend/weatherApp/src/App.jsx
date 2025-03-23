import React, { useEffect, useState } from "react";
import "./styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchCities, fetchWeather } from "./utils/api";

const App = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [mostViewed, setMostViewed] = useState(
    JSON.parse(localStorage.getItem("mostViewed")) || []
  );

  useEffect(() => {
    const fetchCitiesData = async () => {
      const citiesData = await fetchCities();
      setCities(citiesData);
    };
    fetchCitiesData();
  }, []);

  useEffect(() => {
    if (selectedCity && cities.length > 0) {
      const getWeather = async () => {
        const city = cities.find((city) => city.cityName === selectedCity);
        if (city) {
          const weather = await fetchWeather(city.placeCode);
          if (weather) {
            setWeatherData(weather);
            updateMostViewed(selectedCity);
          }
        } else {
          console.error("City not found");
        }
      };
      getWeather();
    }
  }, [selectedCity, cities]);

  const updateMostViewed = (city) => {
    setMostViewed((prev) => {
      let updated = [city, ...prev.filter((c) => c !== city)];
      if (updated.length > 3) updated.pop();
      localStorage.setItem("mostViewed", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Weather Forecast</h2>

      <div className="row">
        <div className="col-12 col-md-8 mx-auto">
          <select
            className="form-select mt-3"
            onChange={(e) => {
              const cityName = e.target.value;
              setSelectedCity(cityName);
            }}
          >
            <option value="">Select a city</option>
            {cities.length > 0 ? (
              cities.map((city, index) => (
                <option key={index} value={city.cityName}>
                  {city.cityName}({city.district})
                </option>
              ))
            ) : (
              <option disabled>Loading cities...</option>
            )}
          </select>
        </div>
      </div>

      <div className="mt-3 text-center">
        <strong>Most Viewed:</strong>
        <div className="most-viewed d-flex flex-wrap justify-content-center mt-2">
          {mostViewed.map((city, index) => (
            <button
              key={index}
              className="m-1"
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {weatherData && (
        <div className="weather mt-4 p-4">
          <h3 className="text-center">{selectedCity}</h3>
          <div className="row text-center">
            <div className="col-12 col-md-4">
              <p>
                <img
                  src="thermometer.svg"
                  alt="Termometer icon"
                  className="icon"
                />
                <strong>Temp:</strong> {weatherData.currentWeatherData.temp}°C
              </p>
            </div>
            <div className="col-12 col-md-4">
              <p>
                <img src="wind.svg" alt="Wind icon" className="icon" />
                <strong>Wind:</strong> {weatherData.currentWeatherData.wind}
                km/h
              </p>
            </div>
            <div className="col-12 col-md-4">
              <p>
                <img
                  src="water-drop.svg"
                  alt="Water drop icon"
                  className="icon"
                />
                <strong>Humidity:</strong>
                {weatherData.currentWeatherData.humidity}%
              </p>
            </div>
          </div>

          <h4 className="text-center mt-3">5-Day Forecast</h4>
          <div className="forecast-container">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <p>{day.date}</p>
                <p>
                  <img
                    src="thermometer.svg"
                    alt="Termometer icon"
                    className="icon"
                  />
                  {day.temp}°C
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
