const Destination = require("../models/destination.model");
const DestinationController = {
  // Create a new destination
  createDestination: async (req, res) => {
    try {
      const newDestination = new Destination(req.body);
      const savedDestination = await newDestination.save();
      res.status(201).json(savedDestination);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all destinations
  getAllDestinations: async (req, res) => {
    try {
      const destinations = await Destination.find();
      res.status(200).json(destinations);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Get a single destination by id
  getDestinationById: async (req, res) => {
    try {
      const destination = await Destination.findById(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.status(200).json(destination);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Update a destination
  updateDestination: async (req, res) => {
    try {
      const updatedDestination = await Destination.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedDestination);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a destination
  deleteDestination: async (req, res) => {
    try {
      await Destination.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Destination deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = DestinationController;
