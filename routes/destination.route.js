const express = require("express");
const destinationController = require("../controllers/destination.controller");
const { protect } = require("../middlwares/auth.middlware");

const router = express.Router();

// Public route to get all destinations
router.get("/", destinationController.getAllDestinations);

// Public route to get a single destination by id
router.get("/:id", destinationController.getDestinationById);

// Protected routes for creating, updating, and deleting a destination
// Use the 'protect' middleware to secure these routes
router.post("/", protect, destinationController.createDestination);
router.put("/:id", protect, destinationController.updateDestination);
router.delete("/:id", protect, destinationController.deleteDestination);

module.exports = router;
