const mongoose = require('mongoose');
// register schemas
require('../schemas/list-item');

const ListItem = mongoose.model('listItems');

function createListItem(item) {
  const newListItem = new ListItem(item);
  return newListItem.save();
}

function findAllListItems() {
  return ListItem.find({}).select('-__v');
}

function findListItemByID(_id) {
  return ListItem.findOne({ _id }).select('-__v');
}

function updateListItem({ _id, name, tags = [], isFavorite = false }) {
  return ListItem.where({ _id }).updateOne({ name, tags, isFavorite });
}

function deleteListItem(_id) {
  return ListItem.deleteOne({ _id });
}

function clearDB(){
  return ListItem.deleteMany({});
}

module.exports = {
  createListItem,
  findAllListItems,
  findListItemByID,
  updateListItem,
  deleteListItem,
  clearDB
};
