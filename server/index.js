import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).send('Hello from DALL.E!');
});

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL is missing in the .env file');
    }
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is missing in the .env file');
    }

    await connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('✅ Server running on http://localhost:8080'));
  } catch (error) {
    console.error('❌ Server startup error:', error.message);
    process.exit(1); // Exit the process if an error occurs
  }
};

startServer();
