const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

const TaskEntry = require("./models/task");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(morgan("common"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.post("/create", async (req, res, next) => {
  try {
    const taskEntry = new TaskEntry(req.body);
    const createdEntry = await taskEntry.save();
    res.json(createdEntry);
  } catch (error) {
    next(error);
  }
});

app.get("/list", async (req, res, next) => {
  try {
    const entries = await TaskEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
