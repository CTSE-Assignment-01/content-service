const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  departureLocation: {
    type: String,
    required: true,
    default: "Colombo Fort",
    trim: true,
  },
  schedule: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
