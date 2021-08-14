"use strict";
const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
server.use(cors());

const weatherHandler = require("./controller/weather.controller");
const movieHandler = require("./controller/movie.controller");

server.get("/weather/:lat/:lon", weatherHandler);

server.get("/movie/:city_name", movieHandler);

server.listen(PORT, () => {
  console.log(`I am a live at  ${PORT}`);
});

server.get("/", (req, res) => {
  res.send("Hello World");
});
