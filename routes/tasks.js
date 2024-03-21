const express = require('express');
const taskRoutes = express.Router();

const taskController = require('../controllers/taskController');

taskRoutes.post('/', taskController.createTask);
taskRoutes.get('/', taskController.getAllTasks);
taskRoutes.put('/:id', taskController.updateTask);
taskRoutes.delete('/:id', taskController.deleteTask);

module.exports = taskRoutes
