const express = require('express');
const mongoose = require('mongoose');

const app = express();

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],}))

// MongoDB connection URL

const url = 'mongodb://localhost/MyDB';  
// Connect to MongoDB
mongoose.connect(url);  // You can use { useNewUrlParser: true, useUnifiedTopology: true } if needed

// Get the connection object
const con = mongoose.connection;


con.on('open', () => {
    console.log('Connection Success!..');
});

con.on('error', (err) => {
    console.error('Connection error:', err);
});

app.use(express.json())
// Handle connection events
// Require the student router with the correct path
const studentRouter = require('./routes/students'); // Adjust this path if necessary
app.use('/students', studentRouter);

// Start the Express server
const port = 3001; // You can set your desired port here
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

