const LatestSeatModel = require("../models/latestSeats.model");

// Initial seats data
const initialSeats = [1, 2, 4, 5, 6, 7];

const createInitialSeats = async (req, res) => {
  try {
    await LatestSeatModel.create({ latestSeats: initialSeats });
    res.status(200).send({message:"Initial seats data created"});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateLatestSeats = async (req, res) => {
  try {
    const {requestedSeats} = req.body;
    // console.log("requestedSeats",requestedSeats);
    await LatestSeatModel.updateOne({}, { latestSeats: requestedSeats });
    const updatedSeats = await LatestSeatModel.findOne().exec();
    res.status(200).json({latestSeats:updatedSeats.latestSeats,message:"Seats updated"});
  } catch (error) {
    res.status(500).send({ message:"Server error",error: "Error updating seats" });
  }
};

const getLatestSeats = async (req, res) => {
  try {
    const latestSeatsData = await LatestSeatModel.findOne().exec();
    const latestSeats = latestSeatsData.latestSeats;
    res.status(200).json({latestSeats,message:"Latest seats"});
  } catch (error) {
    res.status(500).send({ error: "Error retrieving latest seats" });
  }
};


module.exports = {
  createInitialSeats,
  updateLatestSeats,
  getLatestSeats
};
