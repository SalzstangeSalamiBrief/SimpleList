import { Request, Response } from 'express';
import {
	findAllListItems,
	findListItemByID,
	updateListItem,
	deleteListItem,
	createListItem,
} from '../database/queries/queries';

import ListItem from '../interfaces/list-item';

interface ResponseBody {
  err: unknown;
  succ: unknown;
}

export async function getAll(req: Request, res: Response): Promise<void> {
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
	res.status(status).json(responseObject);
}

export async function getListItem(req: Request, res: Response): Promise<void> {
	const _idForSearch = String(req.params._id);
	const responseObject: ResponseBody = { err: '', succ: '' };
	let status = 404;
	const isIdValid = _idForSearch && typeof _idForSearch === 'string';
	if (isIdValid) {
		const listItem: ListItem = await findListItemByID(_idForSearch);
		if (listItem === null) {
			responseObject.err = 'Item does not exist';
		} else {
			status = 200;
			responseObject.succ = listItem;
		}
	} else {
		responseObject.err = 'Invalid name passed';
	}
	res.status(status).json(responseObject);
}

export async function createNewListItem(req: Request, res: Response): Promise<void> {
	const newListItem: ListItem = req.body;
	newListItem.name = String(newListItem.name);
	let status = 400;
	const responseObject: ResponseBody = { err: '', succ: '' };
	const listItem = await findListItemByID(newListItem._id);
	if (!listItem) {
		try {
			const {
				name, tags, isFavorite, _id,
			}: ListItem = await createListItem(newListItem);
			status = 201;
			responseObject.succ = {
				name, tags, isFavorite, _id,
			};
		} catch (err) {
			console.log(err);
			responseObject.err = err;
		}
	} else {
		responseObject.err = 'item already exists';
	}
	res.status(status).json(responseObject);
}

export async function deleteSelectedListItem(req: Request, res: Response): Promise<void> {
	const itemToDelete = String(req.body._id);
	let status = 400;
	const responseObject: ResponseBody = { err: '', succ: '' };
	if (itemToDelete) {
		try {
			const result = await deleteListItem(itemToDelete);
			status = 202;
			responseObject.succ = result;
		} catch (err) {
			console.log(err);
			responseObject.err = err;
		}
	}
	res.status(status).json(responseObject);
}

export async function updateSelectedListItem(req: Request, res: Response): Promise<void> {
	const { body } = req;
	let status = 400;
	const responseObject: ResponseBody = { err: '', succ: '' };
	const isBodyValid = 	body.name && body.tags && typeof body.isFavorite !== 'undefined' && body._id;
	if (isBodyValid) {
		try {
			await updateListItem(body);
			// send updated record back to the client
			const result = await findListItemByID(body._id);
			status = 200;
			responseObject.succ = { desc: 'updated successful', result };
		} catch (err) {
			console.log(err);
			responseObject.err = err;
		}
	} else {
		responseObject.err = 'corrupted params passed';
	}

	res.status(status).json(responseObject);
}
