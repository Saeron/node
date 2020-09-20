const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const TaskEntry = require("./models/task");
const ListEntry = require("./models/listTasks");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
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

app.post("/update", async (req, res, next) => {
  try {
    const taskEntry = await TaskEntry.updateOne(
      {
        _id: req.body._id,
      },
      {
        finalizedAt: new Date(req.body.finalizedAt),
      }
    );
    req.body.finalizedAt = req.body.finalizedAt;
    res.json(req.body);
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
app.get("/listv2", async (req, res, next) => {
  if (!req.body.uuid) {
    req.body.uuid = uuidv4();
  } 
  try {
    const listEntry = new ListEntry(req.body);
    const createdEntry = await listEntry.save();
    res.json(createdEntry);
    console.log(createdEntry.tasks)
  } catch (error) {
    next(error);
  }

});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
