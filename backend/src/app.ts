import * as Koa from 'koa';

import * as KoaRouter from '@koa/router';
// import * as bodyParser from 'koa-bodyparser';
import * as koaBody from 'koa-body';
import * as mongoose from 'mongoose';
import * as serve from 'koa-static';
import * as path from 'path';
import * as cors from '@koa/cors';

import Logger from './middleware/logger';
import Blocklist from './middleware/blocklist';

import 'dotenv/config';
import ListItemRouter from './routes/list-item-router';
import ListRouter from './routes/list-router';

const port = process.env.PORT;

function startServer() {
  const app = new Koa();
  const api = new KoaRouter();
  // Add middlewares
  app.use(cors());
  // app.use(bodyParser());
  app.use(koaBody({ multipart: true }));
  app.use(Logger);
  app.use(Blocklist);
  // serve index file via koa-static
  // TODO: http://127.0.0.1:8081/exportedData.csv
  app.use(serve(path.resolve(__dirname, './public')));
  api.use('/api/list-item', ListItemRouter.routes());
  api.use('/api/list', ListRouter.routes());
  app.use(api.routes());

  // start server
  app.listen(process.env.PORT);
  console.log(`App is Listening on ${port}`);
}

// connect to db
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to MongoDB'))
  .then(() => {
    // config and start server
    startServer();
  })
  .catch((err) => console.log(err));
