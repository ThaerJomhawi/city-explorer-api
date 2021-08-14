'use strict';
const axios = require("axios");
const Forecast = require ('../module/weather')
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const weatherHandler = (req, res) => {
    let liveWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.params.lat}&lon=${req.params.lon}&key=${WEATHER_API_KEY}`;
    console.log(liveWeatherUrl);
    let weatherDataArr = [];
  
    axios
      .get(liveWeatherUrl)
      .then((axiosRes) => {
        axiosRes.data.data.map((day) => weatherDataArr.push(new Forecast(day)));
        res.send(weatherDataArr.splice(0, 7));
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  };

  module.exports = weatherHandler;