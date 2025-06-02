const express = require('express');
const app = express();
const fs = require('fs');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

app.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data/sample.json', 'utf8'));
    var idLanguage = {
        labels: { 'stupide': -2 }
    };
    sentiment.registerLanguage('id', idLanguage);
    data.forEach(item => {
        const result = sentiment.analyze(item.comment, { language: 'id' });
        console.log(`User: ${item.user}`);
        console.log(`Komentar: ${item.comment}`);
        console.log(`Skor Sentimen: ${result.score}`);
        console.log('---');
        console.log(result)
    });
})
app.listen(3001)
