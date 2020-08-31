const mongoose = require('mongoose');
// register schemas
require('../schemas/listItem');

const ListItem = mongoose.model('listItems');

function createListItem(item) {
	const newListItem = new ListItem(item);
	return newListItem.save();
}

function findAllListItems() {
	return ListItem.find({}).select('-_id -__v');
}

function findListItemByName(name) {
	return ListItem.findOne({ name }).select('-_id -__v');
}

function updateListItem({ name, tags = [], isFavorite = false }) {
	return ListItem.where({ name }).updateOne({ tags, isFavorite });
}

function deleteListItem(name) {
	return ListItem.deleteOne({ name });
}

module.exports = {
	createListItem,
	findAllListItems,
	findListItemByName,
	updateListItem,
	deleteListItem,
};
