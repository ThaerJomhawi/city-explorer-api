'use strict'


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

  module.exports=Movies;
  