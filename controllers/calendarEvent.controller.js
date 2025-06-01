const express = require("express");
const router = express.Router();
const Event = require("../models/calendarEvent.model.js");

//CRUD
// Add An Event
const addEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update An Event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete An Event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    res.status(200).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get An Event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Events By User
const getEventsByUser = async (req, res) => {
  try {
    const events = await Event.find({ user: req.params.userId });
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  getEventsByUser,
};
