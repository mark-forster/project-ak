// backend/microservice/userservice/app.js
const mongoose = require('mongoose');
const { consumeMessages } = require('./brokers/consumer');
require('dotenv').config();
const PORT = 3001;

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/userservice')
    .then(() => console.log('Connected to MongoDB for User Service'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Start Kafka consumer
consumeMessages().catch((err) => console.error('Error starting Kafka consumer:', err));

// Start server (if additional HTTP API routes are needed in the future)
console.log(`User service running on port ${PORT}`);
