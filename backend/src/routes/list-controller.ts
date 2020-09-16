import { findAllListItems, createListItem } from '../database/queries/queries';
import { parseCSVFromListItemArray, parseListItemArrayFromCSV, } from '../util/csv-handler';
export async function importList({ request, response }, next) {
  let status = 400;
  const file = request.files.file;

  if (file.type === 'application/vnd.ms-excel') {
    try {
      await parseListItemArrayFromCSV(file.path);
      status = 200;
    } catch (err) {
      console.log(err);
    }
  }

  response.status = status;
  next();
}

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
