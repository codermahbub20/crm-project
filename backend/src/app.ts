import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

// Use CORS with proper configuration
app.use(
  cors({
    origin: 'http://localhost:5173', // ✅ your frontend URL
    credentials: true, // ✅ allow cookies, headers, etc.
  }),
);

app.use(express.json());

// Application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello CRM World!');
});

export default app;
