import * as Express from 'express';

import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as Logger from 'morgan';
import CorsOptions from './config/CorsConfig';
import Blocklist from './middleware/blocklist';

import 'dotenv/config';
import ListItemRouter from './routes/list-item-router';
import ListRouter from './routes/list-router';

const port = process.env.PORT;

function startServer() {
	const app = Express();
	// Add middlewares
	app.use(cors(CorsOptions));
	app.use(Logger('combined'));
	app.use(Express.static('./src/public'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	// serve index file via koa-static
	app.use('/api/list-item', Blocklist, ListItemRouter);
	app.use('/api/list', Blocklist, ListRouter);

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
