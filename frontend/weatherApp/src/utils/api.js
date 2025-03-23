const API_URL =
  "https://cors-anywhere.herokuapp.com/https://api.meteo.lt/v1/places";

export const fetchCities = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.map((city) => ({
      placeCode: city.code,
      cityName: city.name,
      district: city.administrativeDivision,
    }));
  } catch (error) {
    console.error("Error fetching cities", error);
    return [];
  }
};

export const fetchWeather = async (placeCode) => {
  try {
    const response = await fetch(`${API_URL}/${placeCode}/forecasts/long-term`);
    const data = await response.json();

    if (!data.forecastTimestamps) {
      console.error("Invalid data format", data);
      return null;
    }

    const currentWeather = data.forecastTimestamps[0];
    const currentWeatherData = {
      temp: Math.round(currentWeather.airTemperature),
      wind: currentWeather.windSpeed,
      humidity: currentWeather.relativeHumidity,
    };

    const forecast = data.forecastTimestamps
      .filter((day) => day.forecastTimeUtc.includes("12:00"))
      .slice(0, 5)
      .map((day) => ({
        date: day.forecastTimeUtc.split(" ")[0],
        temp: Math.round(day.airTemperature),
      }));
    return { currentWeatherData, forecast };
  } catch (error) {
    console.error("Error fetching weather", error);
    return null;
  }
};
