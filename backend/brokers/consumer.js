// backend/mainservice/brokers/consumer.js
const kafka = require('kafka-node');


const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const consumer = new Consumer(client, [{ topic: 'response-user' }], { autoCommit: true });

async function consumeMessages(callback) {
    consumer.on('message', async (message) => {
        try {
            // Parse message
            const data = JSON.parse(message.value);
            console.log('Received user created message:', data);
            callback(data);
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    consumer.on('error', (err) => {
        console.error('Kafka Consumer Error:', err);
    });
}

// async function createUser(data) {
//     console.log('Processing user creation:', data);
//     // Add logic for user creation here
// }

module.exports = { consumeMessages };

