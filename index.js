const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require("./routes/user.route.js");
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(
    "mongodb+srv://pbueno159:5d7kCKDkAv9nqPwY@capycaldb.uojru0z.mongodb.net/CapycalDB?retryWrites=true&w=majority&appName=CapyCalDB"
  )
  .then(() =>
    app.listen(port, () => {
      console.log(`CapyCal backend listening on port ${port}`);
    })
  )
  .catch((err) => console.log(err));
