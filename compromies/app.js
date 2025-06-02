const express = require('express');
const app = express();
const nlp = require('compromise');
const compromiseDates = require('compromise-dates');
nlp.extend(compromiseDates);

app.get('/', (req, res) => {
    const text = "Wayne's World, party time in USA";
    const doc = nlp(text);
    console.log("Orang:", doc.people().out('array'));  
    console.log("Tempat:", doc.places().out('array')); 
    console.log("Waktu :", doc.dates().out('array'));  
})
app.listen(3001)
