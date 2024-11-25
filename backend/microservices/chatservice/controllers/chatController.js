// backend/microservice/userservice/controller/userController.js
const { produceMessage } = require('../brokers/producer');
const Chat = require('../models/chatModel');
const sendMsg = async (data) => {
    const newChat = new Chat (data);
    await newChat.save();
    console.log(newChat);
}

module.exports = {sendMsg}