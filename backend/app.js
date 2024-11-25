// backend/app.js
const express = require('express');
const mainController = require('./controllers/mainController');
const { consumeMessages } = require('./brokers/consumer');
const cors = require('cors');
const {app,server} = require('./socket/socket');
// Middleware
app.use(express.json());
app.use(cors("*"));
// Routes
app.use(mainController);

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Main service listening on port ${PORT}`);
});

// Start Kafka consumer
consumeMessages().catch((err) => console.error('Error starting Kafka consumer:', err));
