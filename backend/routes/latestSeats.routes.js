const express = require("express");
const { createInitialSeats, updateLatestSeats, getLatestSeats } = require("../controller/latestSeats.controller");
const { resetAllBooked } = require("../controller/seats.controller");
const latestSeatsRouter = express.Router();

latestSeatsRouter.post("/generate",createInitialSeats)
latestSeatsRouter.patch("/update/all",updateLatestSeats)
latestSeatsRouter.get("/",getLatestSeats)


module.exports = latestSeatsRouter