const express = require('express');
const app = express();
const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['id'], forceNER: true });
async function trainBot() {
    manager.addDocument('id', 'hai', 'greet');
    manager.addDocument('id', 'halo', 'greet');
    manager.addDocument('id', 'selamat pagi', 'greet');
    manager.addAnswer('id', 'greet', 'Hai juga! Ada yang bisa saya bantu?');

    manager.addDocument('id', 'jam berapa sekarang', 'ask.time');
    manager.addDocument('id', 'tolong beri tahu waktu', 'ask.time');
    manager.addAnswer('id', 'ask.time', () => {
        const jam = new Date().toLocaleTimeString('id-ID');
        return `Sekarang jam ${jam}`;
    });

    manager.addDocument('id', 'siapa nama kamu', 'ask.name');
    manager.addDocument('id', 'nama kamu siapa', 'ask.name');
    manager.addAnswer('id', 'ask.name', 'Saya chatbot pintar buatan kamu!');

    manager.addAnswer('id', 'None', 'Maaf, saya belum mengerti maksud kamu.');

    await manager.train();
    manager.save();

    return manager;
}

async function chat(userInput) {
    const manager = await trainBot();
    const response = await manager.process('id', userInput);
    console.log(`Bot: ${response.answer}`);
}


app.get('/', (req, res) => {
    chat('halo');
})

app.listen(3001)
