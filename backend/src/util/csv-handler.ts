import ListItem from '../interfaces/list-item';
// todo error with import
import * as fs from 'fs';
import * as path from 'path';

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
      let rowString: string = `${arr[i].name}, ${arr[i].isFavorite}, ${arr[
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
 * Function which parses a exportedData.csv file from ./csv-output into an Array<ListItem>
 */
export async function parseListItemArrayFromCSV() {
  // TODO: resolve reject promise return
  const resultArray: Array<ListItem> = [];
  // read a csv-file from the fs
  const fileContent: string = await new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, '../public/exportedData.csv'),
      { encoding: 'utf8' },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      },
    );
  });
  const fileRowArray: Array<String> = fileContent.split('\r\n');
  // remove row for the cols:
  fileRowArray.shift();
  // parse ListItem and push it to resultArray
  while (fileRowArray.length > 0) {
    const entry = fileRowArray.shift().split(',');
    const parsedEntry: ListItem = { name: '', isFavorite: false, tags: [] };
    if (entry.length === 3) {
      parsedEntry.name = entry[0].trim();
      parsedEntry.isFavorite = entry[1].trim() === 'true';
      parsedEntry.tags = entry[2].trim().split(' ');
      resultArray.push(parsedEntry);
    }
  }
  return resultArray;
}

export function openCSVFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, '../public/exportedData.csv'),
      { encoding: 'utf8' },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      },
    );
  });
}
