import {
	findAllListItems, findListItemByName, updateListItem, deleteListItem, createListItem,
} from '../database/queries/queries';

interface ListItem {
  name: String;
  tags: String[];
  isFavorite: Boolean;
}

// todo
interface ResponseBody {
  err: any;
  succ: any;
}

// TODO: ctx type
export async function getAll(ctx, next) {
	const responseObject: ResponseBody = { err: '', succ: '' };
	let status = 404;
	try {
		const itemList: Array<ListItem> = await findAllListItems();
		status = 200;
		responseObject.succ = itemList;
	} catch (err) {
		console.log(err);
		responseObject.err = err;
	}
	ctx.response.status = status;
	ctx.response.body = responseObject;
	next();
}

export async function getListItem(ctx, next) {
	const nameForSearch: String = String(ctx.request.params.name);
	const responseObject: ResponseBody = { err: '', succ: '' };
	let status = 404;
	if (nameForSearch && typeof nameForSearch === 'string') {
		const listItem: ListItem = await findListItemByName(nameForSearch);
		if (listItem === null) {
			responseObject.err = 'Item does not exist';
		} else {
			status = 200;
			responseObject.succ = listItem;
		}
	} else {
		responseObject.err = 'Invalid name passed';
	}
	ctx.response.status = status;
	ctx.response.body = responseObject;
	next();
}

// todo checks for body
export async function createNewListItem(ctx, next) {
	const newListItem: ListItem = ctx.request.body;
	let status: Number = 400;
	const responseObject: ResponseBody = { err: '', succ: '' };
	const listItem = await findListItemByName(newListItem.name);
	if (!listItem) {
		try {
			const { name, tags, isFavorite }: ListItem = await createListItem(newListItem);
			status = 201;
			responseObject.succ = { name, tags, isFavorite };
		} catch (err) {
			console.log(err);
			responseObject.err = err;
		}
	} else {
		responseObject.err = 'item already exists';
	}
	ctx.response.status = status;
	ctx.response.body = responseObject;
	next();
}

export async function deleteSelectedListItem(ctx, next) {
	const itemToDelete: String = String(ctx.request.body.name);
	let status: Number = 400;
	const responseObject: ResponseBody = { err: '', succ: '' };
	if (typeof itemToDelete === 'string') {
		try {
			const result = await deleteListItem(itemToDelete);
			status = 202;
			responseObject.succ = result;
		} catch (err) {
			console.log(err);
			responseObject.err = err;
		}
	}
	ctx.response.status = status;
	ctx.response.body = responseObject;
	next();
}

export async function updateSelectedListItem(ctx, next) {
	const { name, tags, isFavorite }: ListItem = ctx.request.body;
	let status: Number = 400;
	const responseObject: ResponseBody = { err: '', succ: '' };
	if (name && typeof name === 'string' && tags && (Array.isArray(tags))) {
		try {
			await updateListItem({ name, tags, isFavorite });
			// send updated record back to the client
			const result = await findListItemByName(name);
			status = 200;
			responseObject.succ = { desc: 'updated record', result };
		} catch (err) {
			console.log(err);
			responseObject.err = err;
		}
	} else {
		responseObject.err = 'corrupted params passed';
	}

	ctx.response.status = status;
	ctx.response.body = responseObject;
	next();
}
