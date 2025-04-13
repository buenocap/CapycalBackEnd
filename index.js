const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const userRouter = require("./routes/user.route.js");
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
