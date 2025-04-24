import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

// parsers use
app.use(express.json());
app.use(cors());

// routes use
// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello CRM World!');
});

export default app;
