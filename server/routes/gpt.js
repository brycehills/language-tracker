// server/routes/gpt.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/suggestions', async (req, res) => {
  const { session } = req.body;
  if (!session) return res.status(400).json({ error: 'Missing session data' });

  const prompt = `Based on this study session: ${JSON.stringify(session)}, give personalized language learning suggestions.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // try 'gpt-3.5-turbo' if you get errors
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    console.log('OpenAI API status:', response.status);
    console.log('OpenAI API response:', data);

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'OpenAI API error' });
    }

    res.json({ suggestions: data.choices?.[0]?.message?.content });
  } catch (err) {
    console.error('GPT API error:', err);
    res.status(500).json({ error: 'Error generating suggestions' });
  }
});

export default router;