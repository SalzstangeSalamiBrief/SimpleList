import * as fs from 'fs';
import * as path from 'path';
import ListItem from '../interfaces/list-item';
import { createListItem, clearDB } from '../database/queries/queries';
// todo error with import

/**
 * function which takes an Array of ListItems and parse it into an exportedData.csv file in ./csv-output/ folder
 * @param arr Array<ListItem>
 */
export function parseCSVFromListItemArray(arr: Array<ListItem>) {
	return new Promise((resolve, reject) => {
		const writeStream: fs.WriteStream = fs.createWriteStream(
			path.resolve(__dirname, '../public/exportedData.csv'),
		);

		writeStream.on('error', (err) => {
			reject(err);
		});
		writeStream.on('close', () => {
			console.log('wrote successfully to the stream');
			resolve();
		});
		// write col header
		writeStream.write('name, isFavorite, tags \r\n');
		// write rows
		for (let i = 0; i < arr.length; i += 1) {
			let rowString = `${arr[i].name}, ${arr[i].isFavorite}, ${arr[
				i
			].tags.join(' ')}`;
			if (i < arr.length - 1) {
				rowString += ' \r\n';
			}
			writeStream.write(rowString);
		}
		writeStream.close();
	});
}

/**
 * Function which takes a uploaded filepath, reads the file at the filepath and fills the database with corresponding values
 */
export async function parseListItemArrayFromCSV(filepath: string) {
	const readStream = fs.createReadStream(filepath, { encoding: 'utf8' });
	let fileData = '';
	readStream.on('data', (chunk) => {
		fileData += chunk;
	});
	readStream.on('close', async () => {
		await clearDB();
		const arrOfRows: Array<string> = fileData.split('\r\n');
		// remove heading
		arrOfRows.shift();
		// loop through the array of rows and create entries in the database
		const promiseArray = [];
		let i = 0;
		while (i < arrOfRows.length) {
			// remove the whitespace in each row and split each col
			const [name, isFavorite, tags] = arrOfRows[i].replace(/ /, '').split(',');
			const itemToCreate = {
				name,
				isFavorite: isFavorite === 'true',
				tags: tags.split(' ').filter((item) => item),
			};
			promiseArray.push(createListItem(itemToCreate));
			i += 1;
		}
		await Promise.all(promiseArray);
		console.log('upload completed');
	});
}
