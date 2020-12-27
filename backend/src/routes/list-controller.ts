import { Request, Response } from 'express';
import { findAllListItems } from '../database/queries/queries';
import { parseCSVFromListItemArray, parseListItemArrayFromCSV } from '../util/csv-handler';

export async function importList(
	req: Request, res: Response,
): Promise<void> {
	let status = 400;
	const { file: { mimetype, data } } = req.files;
	if (mimetype === 'application/vnd.ms-excel') {
		try {
			await parseListItemArrayFromCSV(data);
			status = 200;
		} catch (err) {
			console.log(err);
		}
	}
	res.status(status).end();
}

export async function exportList(
	req: Request, res: Response,
): Promise<void> {
	const responseObject = { err: '', route: '' };
	let status;
	try {
		const allListItems = await findAllListItems();
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
