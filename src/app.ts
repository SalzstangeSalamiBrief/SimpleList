import * as Koa from 'koa';

import * as KoaRouter from '@koa/router';
import * as bodyParser from 'koa-bodyparser';
import * as mongoose from 'mongoose';
import * as serve from 'koa-static';
import * as path from 'path';

import Logger from './backend/middleware/logger';
import Blocklist from './backend/middleware/blocklist';

import 'dotenv/config';
import ListItemRouter from './backend/routes/list-item-router';

const port = process.env.PORT;

function startServer() {
	const app = new Koa();
	const api = new KoaRouter();
	// Add middlewares
	app.use(bodyParser());
	app.use(Logger);
	app.use(Blocklist);
	// serve index file via koa-static
	app.use(serve(path.resolve(__dirname, './frontend/'), { index: './html/index.html' }));
	api.use('/api/list-item', ListItemRouter.routes());

	app.use(api.routes());

	// start server
	app.listen(process.env.PORT);
	console.log(`App is Listening on ${port}`);
}

// connect to db
mongoose
	.connect(process.env.MONGO_URL,
		{
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
