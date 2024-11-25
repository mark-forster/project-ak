const express = require('express');
const app = express();
const {consumeMessages} = require('./brokers/consumer')
const mongoose = require('mongoose');


// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/chatService')
    .then(() => console.log('Connected to MongoDB for Chat Service'))
    .catch((err) => console.error('MongoDB connection error:', err));


 consumeMessages().catch((err) => console.error('Error starting Kafka consumer:', err));

app.listen(4000,()=>{
    console.log("Server started on port 4000");
});


