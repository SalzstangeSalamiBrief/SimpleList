import * as mongoose from 'mongoose';
import { config } from 'dotenv';

config();

function connectToDB(): Promise<void> {
	return mongoose
		.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('connected to mongoDB'))
		.catch((err) => console.error(err));
}

function disconnectFromDB(): Promise<void> {
	return mongoose.disconnect();
}

function dropDB(): Promise<void> {
	return new Promise((resolve) => {
		mongoose.connection.db.dropDatabase();
		resolve();
	});
}

async function seedData() {
	await dropDB();
	await connectToDB();
	await disconnectFromDB();
}

seedData();
