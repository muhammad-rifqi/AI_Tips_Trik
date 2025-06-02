const express = require('express');
const app = express();
const natural = require('natural');
app.use(express.json());

app.get('/', (req, res) => {
    const classifier = new natural.BayesClassifier();
    const trainingData = [
        { text: 'saya sangat suka film ini', category: 'positif' },
        { text: 'film ini sangat bagus', category: 'positif' },
        { text: 'aktornya luar biasa', category: 'positif' },
        { text: 'saya benci film ini', category: 'negatif' },
        { text: 'film ini sangat buruk', category: 'negatif' },
        { text: 'saya tidak merekomendasikan film ini', category: 'negatif' }
    ];
    trainingData.forEach(doc => {
        console.log(`Document trained: "${doc.text}" as "${doc.category}"`);
        classifier.addDocument(doc.text, doc.category);
    });
    classifier.train();
    console.log("Klasifikasi 'saya suka film ini':", classifier.classify('saya suka film ini'));
    console.log("Klasifikasi 'film ini jelek sekali':", classifier.classify('film ini jelek sekali'));
    console.log("Klasifikasi 'film ini biasa saja':", classifier.classify('film ini biasa saja'));
    console.log("Probabilitas 'film ini bagus':", classifier.getClassifications('film ini bagus'));
    res.send('Klasifikasi selesai. Lihat konsol server untuk hasilnya.');
});
app.listen(3001, () => {
    console.log('Server berjalan di port 3001');
});