
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');


const app = express();
require('dotenv').config();


app.use(express.json());

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://aksharamaheshwaram93:Katyayani@cluster0.ltuwzqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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
