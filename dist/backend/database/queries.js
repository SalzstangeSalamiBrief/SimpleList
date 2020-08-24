const mongoose = require('mongoose');
// register schemas
require('./schemas/listItem');

const ListItem = mongoose.model('listItems');

function createListItem(item) {
	let newListItem;
	const itemGotName = item.name && typeof item.name === 'string';
	const itemGotTags = item.tags && Array.isArray(item.tags);
	if (itemGotName && itemGotTags) {
		newListItem = new ListItem(item);
		return newListItem.save();
	}
	return -1;
}

async function findAllListItems() {
	const result = await ListItem.find({});
	return result;
}

async function findListItemByName(name) {
	const result = await ListItem.findOne({ name })
		.select('-_id -__v')
		.exec();
	return result;
}

async function updateListItem(name, tags = [], isFavorite) {
	const updateObject = {};
	if (tags.length > 1) updateObject.tags = tags;
	if (isFavorite) updateObject.isFavorite = isFavorite;
	if (name && typeof name === 'string') {
		const result = await ListItem.updateOne({ name }, (err) => {
			if (err) {
				console.log(err);
				return -1;
			}
			return 1;
			// todo error handling
		});
		return result.nModified;
	}
	return -1;
}

async function deleteListItem(name) {
	const result = await ListItem.deleteOne({ name }, (err) => {
		if (err) {
			console.log(err);
			return -1;
		}
		return 1;
	});
	return result;
}

module.exports = {
	createListItem,
	findAllListItems,
	findListItemByName,
	updateListItem,
	deleteListItem,
};
