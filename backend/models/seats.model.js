const mongoose = require("mongoose")
// Define the Seat schema and model
const seatSchema = new mongoose.Schema({
    isBooked: {
        type: Boolean,
        default: false
    },
    seatNo: {
        type: Number,
        required: true
    },
},{
    versionKey:false
});
const SeatModel = mongoose.model('Seat', seatSchema);

module.exports=SeatModel