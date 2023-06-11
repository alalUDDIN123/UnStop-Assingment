const express = require("express");
const { generateSeats, getAllSeats, bookingSeats, unbookSeats } = require("../controller/seats.controller");
const seatsRouter = express.Router();

seatsRouter.post("/create", generateSeats)
seatsRouter.get("/get/all",getAllSeats)
seatsRouter.post("/book",bookingSeats)
seatsRouter.patch("/unbook",unbookSeats)

module.exports = seatsRouter