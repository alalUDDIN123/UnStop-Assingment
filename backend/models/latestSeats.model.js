const mongoose = require("mongoose");

const latestSeatSchema = new mongoose.Schema(
  {
    latestSeats: {
      type: [Number], 
      required: true
    }
  },
  {
    versionKey: false
  }
);

const LatestSeatModel = mongoose.model("LatestSeats", latestSeatSchema);

module.exports=LatestSeatModel


