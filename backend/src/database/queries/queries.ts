import * as mongoose from 'mongoose';

import ListItemInterface from '../../interfaces/list-item';
// register schemas
require('../schemas/list-item');

const ListItem = mongoose.model('listItems');

function createListItem(item: ListItemInterface) {
	const newListItem = new ListItem(item);
	return newListItem.save();
}

function findAllListItems() {
	return ListItem.find({}).select('-__v');
}

function findListItemByID(_id: string) {
	return ListItem.findOne({ _id }).select('-__v');
}

function updateListItem({
	_id, name, tags = [], isFavorite = false,
}) {
	return ListItem.findOneAndUpdate({ _id }, { name, tags, isFavorite });
}

function deleteListItem(_id: string) {
	return ListItem.deleteOne({ _id });
}

function clearDB() {
	return ListItem.deleteMany({});
}

export {
	createListItem,
	findAllListItems,
	findListItemByID,
	updateListItem,
	deleteListItem,
	clearDB,
};
