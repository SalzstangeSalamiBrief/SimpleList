const mongoose = require('mongoose');

require('dotenv').config();

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

async function seedData() {
  await connectToDB();
  await disconnectFromDB();
}

function disconnectFromDB() {
  return mongoose.disconnect();
}

function dopDB() {
  return new Promise((resolve) => {
    mongoose.connection.db.dropDatabase();
    resolve(true);
  });
}

seedData();
