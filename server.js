const express = require('express');
const path = require('path');
const { OpenAIAPI } = require('./openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/getChatbotResponse', async (req, res) => {
    try {
        const userMessage = req.body.userMessage;
        if (!userMessage) {
            return res.status(400).json({ error: 'userMessage is required' });
        }

        const chatbotResponse = await OpenAIAPI.generateResponse(userMessage);
        res.json({ chatbotResponse });
    } catch (error) {
        console.error('Error in /getChatbotResponse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});