const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
const nlp = require('compromise');
const app = express();


app.get('/list', (req, resp) => {
    axios.get('https://www.medcom.id/nasional/peristiwa/ZkeZVGvK-di-puncak-candi-borobudur-100-bhikkhu-sambut-presiden-ri-dan-prancis')
        .then(res => {
            const $ = cheerio.load(res.data)
            // const text = $('body').text().replace(/\s+/g, ' ').trim();
            const text = $('div[class="text"]').text();
            const doc = nlp(text);
            const topics = doc.topics().out('array');
            const people = doc.people().out('array');
            const places = doc.places().out('array');
            const organizations = doc.organizations().out('array');
            const allTopics = [...new Set([...topics, ...people, ...places, ...organizations])];
            resp.json({
                url: 'https://www.medcom.id/nasional/',
                extractedText: JSON.stringify(text, null, 3).replace(/\\n/g, '').replace(/\\t/g, '').replace(/\\r/g, '').replace(' ', ''),
                topik : allTopics,
                // title: titleText, // Uncomment jika kamu menggunakannya
                // firstHeader: firstHeaderText, // Uncomment jika kamu menggunakannya


            });
        }).catch(err => console.error(err))
})

app.listen(3000)