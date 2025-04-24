import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// parsers use
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello CRM World!');
});

export default app;
