// backend/microservice/userservice/brokers/consumer.js
const kafka = require('kafka-node');
const { createUser ,loginUser} = require('../controllers/userController');

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const consumer = new Consumer(client, [{ topic: 'create-user' }], { autoCommit: true });

async function consumeMessages() {
    consumer.on('message', async (message) => {
        try {
            console.log('Received message:', message);

            // Parse message
            const data = JSON.parse(message.value);
            console.log("Catching Action", data.action);
            // Process message (e.g., call a controller or service function)
            if(data.action == 'register'){
                await createUser(data.userData);
            }
            else{
                await loginUser(data.userData);
            }
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

