const mongoose = require("mongoose");
const taskSchema = require("./task");

const { Schema } = mongoose;

const listTaskSchema = new Schema({
  uuid: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  tasks: {
    type: [taskSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const ListEntry = mongoose.model("ListEntry", listTaskSchema);
module.exports = ListEntry;
