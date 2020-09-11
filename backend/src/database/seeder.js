const mongoose = require("mongoose");

const ListItemSchema = require("./schemas/list-item");

require("dotenv").config();

function connectToDB() {
  return mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      const testItem = new ListItemSchema({
        name: 687459,
        tags: ["a", "b"],
      });
      return testItem.save();
    })
    .then(() => console.log("connected to mongoDB"))
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
