const Task = require('../models/task');

exports.createTask = async (req, res) => {
    const { name, description, priority, dueDate, category } = req.body;
    try {
       
        const task = new Task({
            userId: req.id, 
            name,
            description,
            priority,
            dueDate,
            category
        });
        await task.save();
        res.status(201).json({ msg: 'Task created successfully', task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }); 
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateTask = async (req, res) => {
    const { name, description, priority, dueDate, category, completed } = req.body;
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        task.name = name;
        task.description = description;
        task.priority = priority;
        task.dueDate = dueDate;
        task.category = category;
        task.completed = completed;

        await task.save();
        res.json({ msg: 'Task updated successfully', task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        await task.remove();
        res.json({ msg: 'Task deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
