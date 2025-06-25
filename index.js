const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

//Load envrionment variables in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require("./routes/user.route.js");
app.use("/users", userRouter);

const eventRouter = require("./routes/calendarEvent.route.js");
app.use("/events", eventRouter);

const protectedRoutes = require("./routes/protected.route.js");
app.use("/settings", protectedRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use evn varibles for MongoDB
const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/CapycalDB";

mongoose
  .connect(mongoUri)
  .then(() =>
    app.listen(port, () => {
      console.log(`CapyCal backend listening on port ${port}`);
    })
  )
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
