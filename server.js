"use strict";
const express = require("express"); // require the express package
const server = express(); // initialize your express app instance
const cors = require("cors"); // after you initialize your express app instance
require("dotenv").config();
const PORT = process.env.PORT;
const axios = require("axios");
const weather = require("./data/weather.json");
server.use(cors());
// a server endpoint

server.listen(PORT, () => {
  console.log(`I am a live at  ${PORT}`);
});

server.get("/", (req, res) => {
  res.send("Hello World");
});
server.get("/weather", (req, res) => {
  res.send(weather);
});

server.get("/weather/:city_name", (req, res) => {
  let weatherDataArr = [];
  const exploreCity = weather.find(
    (index) => index.city_name === req.params.city_name
  );
  if (exploreCity) {
    exploreCity.data.map((day) =>
      weatherDataArr.push(new WeatherForecast(day))
    );
    res.send(weatherDataArr);
  } else {
    res.status.send("try change the city name");
  }
});

class WeatherForecast {
  constructor(location) {
    this.date = location.datetime;
    this.description = location.weather.description;
  }
}
