const express = require('express');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY is not set. Add it to your .env file before using chat.');
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json({ limit: '20kb' }));
app.use(express.static(__dirname));

app.post('/api/chat', async (req, res) => {
  const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: 'The AI service is not configured yet.' });
  }

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are SILA AI, a friendly and practical assistant. Help with writing, business ideas, creativity, productivity, and Swahili or English communication. Respond in the language the user uses. Keep answers clear and useful. Do not claim to have performed actions you cannot perform.'
        },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();
    res.json({ reply: reply || 'I could not generate a reply. Please try again.' });
  } catch (error) {
    console.error('OpenAI request failed:', error.message);
    res.status(502).json({ error: 'The AI service could not process your request.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`SILA AI is running at http://localhost:${port}`);
});
