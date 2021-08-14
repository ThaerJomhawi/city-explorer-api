'use strict'
const axios = require("axios");
const Movies = require ('../module/movie')
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


const movieHandler=(req, res) => {
    let movieUrl = `https://api.themoviedb.org/3/search/multi?api_key=${MOVIE_API_KEY}&query=${req.params.city_name}`;
    console.log(movieUrl);
    let movieDataArr = [];
  
    axios
      .get(movieUrl)
      .then((movieRes) => {
        movieRes.data.results.map((item) => {
          movieDataArr.push(new Movies(item));
          console.log(item);
        });
        res.send(movieDataArr);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  };

  module.exports=movieHandler;