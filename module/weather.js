'use strict';

class Forecast {
    constructor(location) {
      this.date = location.datetime;
      this.description = location.weather.description;
    }
  }
  module.exports=Forecast