import * as mongoose from 'mongoose';
import { config } from 'dotenv';

config();

function connectToDB() {
	return mongoose
		.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('connected to mongoDB'))
		.catch((err) => console.error(err));
}

function disconnectFromDB() {
	return mongoose.disconnect();
}

async function seedData() {
	await connectToDB();
	await disconnectFromDB();
}

// function dropDB() {
// 	return new Promise((resolve) => {
// 		mongoose.connection.db.dropDatabase();
// 		resolve(true);
// 	});
// }

seedData();
