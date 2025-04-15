const mongoose = require("mongoose");
const User = require("./user.model.js");

const CalendarEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "Description is required"] },
    startTime: { type: Date, required: false },
    endTime: { type: Date, required: false },
    location: { type: String, required: false },
    allDay: { type: Boolean, required: false },
    assignedColor: { type: String, required: false, default: "#4285F4" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", CalendarEventSchema);

module.exports = Event;
