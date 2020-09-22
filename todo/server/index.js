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
    const entries = await ListEntry.findOne({
      uuid: req.body.uuid,
    }).then((list) => {
      list.tasks.push(req.body.task);
      res.json(list.tasks);
      return list.save();
    });
  } catch (error) {
    next(error);
  }
});

app.post("/update", async (req, res, next) => {
  // "tasks.finalizedAt": new Date(req.body.finalizedAt);
  //necesito que se creen en el array como objetos con id
  try {
    const entries = await ListEntry.findOne({
      uuid: req.body.uuid,
    }).then((list) => {
      if(!list){
        const error = new Error("List doesn't exits");
        res.status(401);
        next(error);
      }
      var item = list.tasks
        .filter((task) => {
          return task._id == req.body._id;
        })
        .pop();
      item.finalizedAt = req.body.finalizedAt;

      var result = list.tasks.filter((task) => {
        return task._id != req.body._id;
      });
      result.push(item);
      console.log(item);
      res.json(item);
      return list.save();
    });
  } catch (error) {
    next(error);
  }
});

// app.get("/list", async (req, res, next) => {
//   try {
//     const entries = await TaskEntry.find();
//     res.json(entries);
//   } catch (error) {
//     next(error);
//   }
// });

async function createList(req, res, next) {
  req.body.uuid = uuidv4();
  try {
    const listEntry = new ListEntry(req.body);
    const createdEntry = await listEntry.save();
    res.json(createdEntry);
  } catch (error) {
    next(error);
  }
}

app.post("/list", async (req, res, next) => {
  if (!req.body.uuid) {
    createList(req, res, next);
  } else {
    try {
      const entries = await ListEntry.findOne({
        uuid: req.body.uuid,
      });
      if (!entries) {
        const error = new Error("List doesn't exits");
        res.json({
          message: "List unrechable",
          code: 401
        })
        next(error);
      } else {
        res.json(entries);
      }
    } catch (error) {
      next(error);
    }
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
