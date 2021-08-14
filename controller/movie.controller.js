"use strict";
const axios = require("axios");
const Movies = require("../module/movie");
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Cache = require("../module/cache");

let newCache = new Cache([]);
const movieHandler = (req, res) => {
  let key = `Movies-${req.params.city_name}`;
  if (newCache[key]) {
    res.send(newCache[key]);
  } else {
    let movieUrl = `https://api.themoviedb.org/3/search/multi?api_key=${MOVIE_API_KEY}&query=${req.params.city_name}`;
    console.log(movieUrl);
    let movieDataArr = [];

    axios
      .get(movieUrl)
      .then((movieRes) => {
        movieRes.data.results.map((item) => {
          movieDataArr.push(new Movies(item));
          newCache[key] = movieDataArr;
        });
        res.send(movieDataArr);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
};

module.exports = movieHandler;
