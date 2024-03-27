const express = require('express');
const taskRoutes = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const taskController = require('../controllers/taskController');

taskRoutes.post('/',authMiddleware,taskController.createTask);
taskRoutes.get('/', taskController.getAllTasks);
taskRoutes.put('/:id', taskController.updateTask);
taskRoutes.delete('/:id', taskController.deleteTask);

module.exports = taskRoutes
