// backend/microservice/userservice/models/userModel.js
const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    sernder_id: String,
    reciver_id: String,
    content: String,
},{timestamps: true});


module.exports = mongoose.model('Chat', chatSchema);
