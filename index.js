const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

//Load envrionment variables in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://capy-cal.vercel.app/"]
      : ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Use env varibles for MongoDB
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MongoDB URI not found in environment variables");
  process.exit(1);
}

mongoose
  .connect(mongoUri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() =>
    app.listen(port, "0.0.0.0", () => {
      console.log(`CapyCal backend listening on port ${port}`);
    })
  )
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
