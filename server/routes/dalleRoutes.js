import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is missing in the .env file');
  process.exit(1); // Exit the server if API key is missing
}

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// GET Route for testing
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

// POST Route for image generation
router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: '❌ Prompt is required' });
    }

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    if (!aiResponse.data?.data || aiResponse.data.data.length === 0) {
      return res.status(500).json({ error: '❌ Invalid response from OpenAI' });
    }

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });

  } catch (error) {
    console.error('❌ OpenAI API Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data?.error?.message || '❌ Something went wrong' });
  }
});

export default router;
