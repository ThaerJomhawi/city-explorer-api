"use strict";
const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const weather = require("./data/weather.json");
server.use(cors());

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
  console.log(exploreCity);
  if (exploreCity) {
    exploreCity.data.map((day) => weatherDataArr.push(new Forecast(day)));
    res.send(weatherDataArr);
  } else {
    res.status(500).send("try change the city name");
  }
});

class Forecast {
  constructor(location) {
    this.date = location.datetime;
    this.description = location.weather.description;
  }
}
