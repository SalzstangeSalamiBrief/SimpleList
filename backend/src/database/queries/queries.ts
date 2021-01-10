import * as mongoose from 'mongoose';
import ListItemInterface from '../../interfaces/list-item';

require('../schemas/list-item');

const ListItem = mongoose.model('listItems');

export async function createListItem(
	item: ListItemInterface,
): Promise<ListItemInterface> {
	const newListItem = new ListItem(item);
	const createdListItem = (await newListItem.save()).toObject({ versionKey: false });
	console.log(createdListItem);
	return createdListItem;
}

export async function findAllListItems():
Promise<Array<ListItemInterface>> {
	const allItems = <Array<ListItemInterface>> await ListItem.find({}).select('-__v').lean();
	return allItems;
}

export async function findListItemByID(
	_id: string,
): Promise<ListItemInterface> {
	const selectedItem = <ListItemInterface> await ListItem.findOne({ _id }).select('-__v').lean();
	return selectedItem;
}

export async function updateListItem({
	_id, name, tags = [], isFavorite = false,
}: ListItemInterface): Promise<ListItemInterface> {
	const updatedItem = 	<ListItemInterface>
		await ListItem.updateOne({ _id }, { name, tags, isFavorite }).lean();
	return updatedItem;
}

export async function deleteListItem(_id: string): Promise<unknown> {
	const deletedItem = await ListItem.deleteOne({ _id }).lean();
	return deletedItem;
}

export async function clearDB(): Promise<unknown> {
	return ListItem.deleteMany({});
}
