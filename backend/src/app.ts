import * as path from 'path';

import * as Express from 'express';

import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as Logger from 'morgan';
import * as FileUpload from 'express-fileupload';
import CorsOptions from './config/CorsConfig';
import BlockList from './middleware/blocklist';

import 'dotenv/config';
import ListItemRouter from './routes/list-item-router';
import ListRouter from './routes/list-router';

const port = process.env.PORT;

function addEventHandlerForErrors(): void{
	process.on('uncaughtException', (err: Error, origin: string) => {
		console.log(
			`uncaught exception: ${err.toString()}`,
			`exception origin: ${origin}\n`,
			err,
		);
		process.exit(1);
	});

	process.on('unhandledRejection', (err: Error, origin: string) => {
		console.log(
			`unhandled rejection: ${err.toString()}`,
			`exception origin: ${origin}\n`,
			err,
		);
		process.exit(1);
	});
}
function startServer() {
	const app = Express();
	addEventHandlerForErrors();

	// Add middlewares
	app.use(cors(CorsOptions));
	app.use(Logger('combined'));
	app.use(Express.static(path.resolve(__dirname, './public')));
	app.use(FileUpload());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// add routes
	app.use('/api/list-item', BlockList, ListItemRouter);
	app.use('/api/list', BlockList, ListRouter);

	// start server
	app.listen(process.env.PORT);
	console.log(`App is Listening on ${port}`);
}

// connect to db and start server after that
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
