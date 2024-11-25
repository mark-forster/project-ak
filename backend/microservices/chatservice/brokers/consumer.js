// // backend/microservice/chatservie/brokers/consumer.js
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const {sendMsg} = require('../controllers/chatController.js');
const consumer = new Consumer(client, [{ topic: 'create-chat' }], { autoCommit: true });

async function consumeMessages() {
    consumer.on('message', async (message) => {
        try {
            console.log('Received message:', message);
            // Parse message
            const data = JSON.parse(message.value);

          const msg=  sendMsg(data);
           console.log('Received message:', msg); 

        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    consumer.on('error', (err) => {
        console.error('Kafka Consumer Error:', err);
    });
}



module.exports = { consumeMessages };

