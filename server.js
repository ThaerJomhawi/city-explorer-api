"use strict";
const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const weather = require("./data/weather.json");
server.use(cors());
const axios = require("axios");
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

server.listen(PORT, () => {
  console.log(`I am a live at  ${PORT}`);
});

server.get("/", (req, res) => {
  res.send("Hello World");
});
server.get("/weather", (req, res) => {
  res.send(weather);
});

server.get("/weather/:lat/:lon", (req, res) => {
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
});

server.get("/movie/:city_name", (req, res) => {
  let movieUrl = `https://api.themoviedb.org/3/search/multi?api_key=${MOVIE_API_KEY}&query=${req.params.city_name}`;
  console.log(movieUrl);
  let movieDataArr = [];

  axios
    .get(movieUrl)
    .then((movieRes) => {
      movieRes.data.results.map((item) =>{
        movieDataArr.push(new Movies(item))
        console.log(item);
      } );
      res.send(movieDataArr);
     
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

class Forecast {
  constructor(location) {
    this.date = location.datetime;
    this.description = location.weather.description;
  }
}

class Movies {
  constructor(city) {
    this.title = city.title;
    this.overview = city.overview;
    this.averageVotes = city.vote_average;
    this.vote_count = city.vote_count;
    this.imageUrl = `https://image.tmdb.org/t/p/w500/${city.poster_path}`;
    this.popularity = city.popularity;
    this.releasedOn = city.release_date;
  }
}
