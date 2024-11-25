// backend/controller/mainController.js
const express = require('express');
const { produceMessage } = require('../brokers/producer');
const {consumeMessages} = require('../brokers/consumer');
const router = express.Router();

router.post('/api/users/:action', async (req, res) => {
    const userData = req.body;
    const {action} = req.params; 
    console.log(action);
    try {
        await produceMessage('create-user',{action:action,userData});
        consumeMessages((data)=>{
            console.log(data);
            res.status(200).json({ message: 'Registered successfully',data: data });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error processing user creation.' });
    }
});

router.post('/api/chats/:action', async (req, res) => {
    const chatData = req.body;
    try {
        await produceMessage('create-chat', chatData);
        console.log(chatData);
        res.status(200).json({ message: 'Chat creation in progress.' });
    } catch (error) {
        res.status(500).json({ error: 'Error processing chat creation.' });
    }
});

module.exports = router;
