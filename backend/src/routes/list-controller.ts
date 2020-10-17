import { Request, Response } from 'express';
import { findAllListItems } from '../database/queries/queries';
import { parseCSVFromListItemArray, parseListItemArrayFromCSV } from '../util/csv-handler';

<<<<<<< HEAD
import ListItem from '../interfaces/list-item';

// set req as any, because of the error that Request does not have the property files
// TODO: maybe fix
export async function importList(req: any, res: Response): Promise<void> {
=======
export async function importList(req: Request, res: Response): Promise<void> {
>>>>>>> master
	let status = 400;
	const { file } = req.files;
	if (file.mimetype === 'application/vnd.ms-excel') {
		try {
			await parseListItemArrayFromCSV(file.data);
			status = 200;
		} catch (err) {
			console.log(err);
		}
	}

	res.status(status).end();
}

export async function exportList(req: Request, res: Response): Promise<void> {
	const responseObject = { err: '', route: '' };
	let status;
	try {
		const allListItems = Array<ListItem>(await findAllListItems());
		await parseCSVFromListItemArray(allListItems);
		status = 200;
		responseObject.route = '/exportedData.csv';
	} catch (err) {
		console.log(err);
		status = 400;
		responseObject.err = err;
	}
	res.status(status).json(responseObject);
}
