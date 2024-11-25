// backend/brokers/producer.js
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

producer.on('ready', () => console.log('Producer is ready'));
producer.on('error', (err) => console.error('Producer error:', err));

async function produceMessage(topic, message) {
    const payloads = [{ topic, messages: JSON.stringify(message) }];
    return new Promise((resolve, reject) => {
        producer.send(payloads, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

module.exports = { produceMessage };
