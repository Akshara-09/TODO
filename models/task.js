// models/task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    priority: String,
    dueDate: Date,
    completed: {
        type: Boolean,
        default: false
    },
    category: String
});

module.exports = mongoose.model('Task', taskSchema);
