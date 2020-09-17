import { findAllListItems } from '../database/queries/queries';
import { parseCSVFromListItemArray, parseListItemArrayFromCSV } from '../util/csv-handler';

export async function importList(req, res): Promise<void> {
	let status = 400;
	const { file } = req.files;

	if (file.type === 'application/vnd.ms-excel') {
		try {
			await parseListItemArrayFromCSV(file.path);
			status = 200;
		} catch (err) {
			console.log(err);
		}
	}

	res.status(status).end();
}

export async function exportList(req, res): Promise<void> {
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