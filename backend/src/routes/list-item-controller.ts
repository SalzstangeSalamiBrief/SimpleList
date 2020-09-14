import {
  findAllListItems,
  findListItemByID,
  updateListItem,
  deleteListItem,
  createListItem,
} from '../database/queries/queries';

import ListItem from '../interfaces/list-item';

interface ResponseBody {
  err: any;
  succ: any;
}

export async function getAll(ctx, next) {
  const responseObject: ResponseBody = { err: '', succ: '' };
  let status: number = 404;
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
  const _idForSearch: string = String(ctx.request.params._id);
  const responseObject: ResponseBody = { err: '', succ: '' };
  let status: number = 404;
  if (_idForSearch && typeof _idForSearch === 'string') {
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
  ctx.response.status = status;
  ctx.response.body = responseObject;
  next();
}

// todo checks for body
export async function createNewListItem(ctx, next) {
  const newListItem: ListItem = ctx.request.body;
  newListItem.name = String(newListItem.name);
  let status: number = 400;
  const responseObject: ResponseBody = { err: '', succ: '' };
  const listItem = await findListItemByID(newListItem._id);
  if (!listItem) {
    try {
      const { name, tags, isFavorite, _id }: ListItem = await createListItem(
        newListItem,
      );
      status = 201;
      responseObject.succ = { name, tags, isFavorite, _id };
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
  const itemToDelete: string = String(ctx.request.body._id);
  let status: number = 400;
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
  const body: ListItem = ctx.request.body;
  let status: number = 400;
  const responseObject: ResponseBody = { err: '', succ: '' };
  if (
    body.name &&
    body.tags &&
    typeof body.isFavorite !== undefined &&
    body._id
  ) {
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

  ctx.response.status = status;
  ctx.response.body = responseObject;
  next();
}
