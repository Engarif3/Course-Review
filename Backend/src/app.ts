import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const test = async (req: Request, res: Response) => {
  res.send('<h2>Welcome to level-2 Assignment-4</h2>');
};

app.get('/', test);

app.use(globalErrorHandler);
//Not Found
app.use(notFound);
export default app;
