This is a simple Weather Forecast App built with React. It lets you select a city, check the current weather, and see a 5-day forecast.
It also saves your most viewed cities for quick access. The app uses React, Bootstrap, and SCSS for styling and fetches weather data from an API.

Hope you like it!

Tech Stack:

React (for the UI)

SCSS (for styling)

Bootstrap (for better-looking components)

LocalStorage (to save most viewed cities)

Fetch API (to get weather data)

Features:

Choose a city – Select a city from the dropdown.

Get weather updates – See temperature, wind, and humidity.

5-day forecast – Plan ahead with future weather predictions.

Most viewed cities – The last 3 cities you checked will be saved.

Bootstrap styling – Looks clean and neat!

How It Works:

City Selection:

When you select a city, the app finds the matching city object from the list.

<select
  className="form-select"
  onChange={(e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
  }}
>
  <option value="">Select a city</option>
  {cities.map((city, index) => (
    <option key={index} value={city.cityName}>
      {city.cityName}
    </option>
  ))}
</select>
The app finds the city by name (city.cityName) and sets it as the selected city.

Fetching Weather Data:
Once a city is selected, the app fetches weather data using the city’s placeCode.

const getWeather = async () => {
  const city = cities.find((city) => city.cityName === selectedCity);
  if (city) {
    const weather = await fetchWeather(city.placeCode);
    if (weather) {
      setWeatherData(weather);
      updateMostViewed(selectedCity);
    }
  }
};
It calls the fetchWeather() function, which retrieves data based on the placeCode of the selected city.

Updates weather info on the page.

Most Viewed Cities (LocalStorage):
The app remembers the last 3 cities you searched and shows them as buttons for quick selection.

const updateMostViewed = (city) => {
  setMostViewed((prev) => {
    let updated = [city, ...prev.filter((c) => c !== city)];
    if (updated.length > 3) updated.pop();
    localStorage.setItem("mostViewed", JSON.stringify(updated));
    return updated;
  });
};

The updateMostViewed() function saves the last 3 cities to localStorage and displays them as buttons for easy access.
