const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        task: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 120,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true,
        },
        finalizedAt: {
            type: Date, 
        }
    },
);

const TaskEntry = mongoose.model('TaskEntry', taskSchema);
module.exports = TaskEntry;