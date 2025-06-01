const express = require("express");
const router = express.Router();
const {
  addEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  getEventsByUser,
} = require("../controllers/calendarEvent.controller.js");
const authMiddleware = require("../middleware/auth");

//CRUD Calendar Events
// Add An Event
router.post("/add", addEvent);
// Update An Event
router.put("/update/:id", updateEvent);
// Delete An Event
router.delete("/delete/:id", deleteEvent);
// Get All Events
router.get("/get-events", getAllEvents);
// Get An Event
router.get("/:id", getEvent);
// Get Events By User
router.get("/user/:userId", getEventsByUser);

module.exports = router;
