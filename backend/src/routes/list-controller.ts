import { findAllListItems, createListItem } from '../database/queries/queries';
import { parseCSVFromListItemArray, openCSVFile } from '../util/csv-handler';

export function importList() {}

export async function exportList({ request, response }, next) {
  let responseObject = {};
  let status = undefined;
  try {
    const allListItems = await findAllListItems();
    await parseCSVFromListItemArray(allListItems);
    status = 200;
    responseObject['route'] = '/exportedData.csv';
  } catch (err) {
    console.log(err);
    status = 400;
    responseObject['err'] = err;
  }
  response.status = status;
  response.body = responseObject;
  next();
}
