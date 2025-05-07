const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotnev").config();

const authroute = require("./routes/authRoutes");
const taskroute = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("./api/auth", authroute);
app.use("./api/task", taskroute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running on port ${process.env.PORT}");
    });
  })
  .catch((err) => console.log(err));
