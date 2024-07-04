import React, { useState, useRef } from "react";
import WeatherTypes from "../utils/WeatherTypes"; // contains an array of objects which each objects containing weather type and image
import { FiSearch } from "react-icons/fi";
import { TiWeatherCloudy } from "react-icons/ti";
import "./Weather.css";
function Weather() {
  const inputRef = useRef(null);
  const Api = process.env.REACT_APP_API_KEY;
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetching weather data by calling this function
  const fetchWeather = async () => {
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api}`;
      setLoading(true);
      const response = await fetch(URL);
      const data = await response.json();
      setApiData(null);

      // check for errors
      if (
        data.cod === 404 ||
        data.cod === 400 ||
        !data.weather ||
        !data.weather[0]
      ) {
        setShowWeather([
          {
            type: "Not Found",
            img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
          },
        ]);
      }
      setShowWeather(
        WeatherTypes.filter((weather) => weather.type === data.weather[0].main)
      );
      setApiData(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="heading">
        <h1>WEATHER APP</h1>
        <TiWeatherCloudy />
      </div>

      <div className="main">
        <div className="inputs">
          <input type="text" placeholder="Eg.Delhi" ref={inputRef} />
          <div className="search_btn" onClick={fetchWeather}>
            <FiSearch />
          </div>
        </div>

        {loading ? ( //if loading is true
          <h1>Loading.....</h1>
        ) : (
          showWeather && ( // if showWeather is true
            <div>
              <img src={showWeather[0].img} alt="weather img" />
              <h3>{showWeather[0]?.type}</h3>
              {apiData ? (
                <div>
                  <h2 className="temperature">{apiData?.main?.temp}&#176;C</h2>
                  <h1>
                    {apiData.name},{apiData.sys.country}
                  </h1>
                </div>
              ) : (
                <h3>Invalid City name</h3>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Weather;
