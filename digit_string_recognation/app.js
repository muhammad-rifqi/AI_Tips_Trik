const express = require('express');
const app = express();
const Tesseract = require("tesseract.js");
const path = require('path');


app.get('/', (req, res) => {
    const imagePath = path.join(__dirname, 'image', 'ocr.jpg');
    console.log("Mencoba membaca gambar dari:", imagePath);
    Tesseract.recognize(imagePath, "eng")
        .then(({ data: { text } }) => {
            console.log("Text dari gambar:", text);
            res.send(`Text dari gambar: <pre>${text}</pre>`);
        })
        .catch(err => {
            console.error("Error saat membaca gambar:", err);
            res.status(500).send(`Terjadi error: ${err.message}`); 
        });
})

app.listen(3001)
