
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');


require('dotenv').config();


const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://aksharamaheshwaram:Katyayani%4039@cluster0.nvpz7od.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error", err);
    process.exit();
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
