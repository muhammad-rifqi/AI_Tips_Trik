const express = require('express');
// const { franc } = require('franc');
const { franc } = require('franc-min');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    let text = "saya mempunyai nama rifqi";
    try {
        const detectedLanguageCode = franc(text);
        if (detectedLanguageCode === 'und') {
            return res.json({
                text: text,
                language: 'undetermined',
                message: 'Could not confidently determine the language.',
            });
        }
        res.json({
            text: text,
            language_code: detectedLanguageCode,
            message: `Detected language code: ${detectedLanguageCode}`,
        });

    } catch (error) {
        console.error('Error detecting language:', error);
        res.status(500).json({ error: 'Internal server error during language detection.' });
    }
})

app.listen(3001)
