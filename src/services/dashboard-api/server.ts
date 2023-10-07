/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import cors from 'cors';
import * as trcpExpress from '@trpc/server/adapters/express';
import { localTRPCCompose } from './app/composition-root';

// create for each request
const createContext = () => ({});

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  'http://localhost:4000/trpc',
  trcpExpress.createExpressMiddleware({
    router: localTRPCCompose().appRouter,
    createContext
  })
);

app.listen(4000, () => {
  console.log('Server started at http://localhost:4000');
});
