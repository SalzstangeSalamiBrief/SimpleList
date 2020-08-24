"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSelectedListItem = exports.deleteSelectedListItem = exports.createNewListItem = exports.getListItem = exports.getAll = void 0;
const queries_1 = require("../database/queries/queries");
// TODO: ctx type
async function getAll(ctx, next) {
    const responseObject = { err: '', succ: '' };
    let status = 404;
    try {
        const itemList = await queries_1.findAllListItems();
        status = 200;
        responseObject.succ = itemList;
    }
    catch (err) {
        console.log(err);
        responseObject.err = err;
    }
    ctx.response.status = status;
    ctx.response.body = responseObject;
    next();
}
exports.getAll = getAll;
async function getListItem(ctx, next) {
    const nameForSearch = String(ctx.request.params.name);
    const responseObject = { err: '', succ: '' };
    let status = 404;
    if (nameForSearch && typeof nameForSearch === 'string') {
        const listItem = await queries_1.findListItemByName(nameForSearch);
        if (listItem === null) {
            responseObject.err = 'Item does not exist';
        }
        else {
            status = 200;
            responseObject.succ = listItem;
        }
    }
    else {
        responseObject.err = 'Invalid name passed';
    }
    ctx.response.status = status;
    ctx.response.body = responseObject;
    next();
}
exports.getListItem = getListItem;
// todo checks for body
async function createNewListItem(ctx, next) {
    const newListItem = ctx.request.body;
    let status = 400;
    const responseObject = { err: '', succ: '' };
    const listItem = await queries_1.findListItemByName(newListItem.name);
    if (!listItem) {
        try {
            const { name, tags, isFavorite } = await queries_1.createListItem(newListItem);
            status = 201;
            responseObject.succ = { name, tags, isFavorite };
        }
        catch (err) {
            console.log(err);
            responseObject.err = err;
        }
    }
    else {
        responseObject.err = 'item already exists';
    }
    ctx.response.status = status;
    ctx.response.body = responseObject;
    next();
}
exports.createNewListItem = createNewListItem;
async function deleteSelectedListItem(ctx, next) {
    const itemToDelete = String(ctx.request.body.name);
    let status = 400;
    const responseObject = { err: '', succ: '' };
    if (typeof itemToDelete === 'string') {
        try {
            const result = await queries_1.deleteListItem(itemToDelete);
            status = 202;
            responseObject.succ = result;
        }
        catch (err) {
            console.log(err);
            responseObject.err = err;
        }
    }
    ctx.response.status = status;
    ctx.response.body = responseObject;
    next();
}
exports.deleteSelectedListItem = deleteSelectedListItem;
async function updateSelectedListItem(ctx, next) {
    const { name, tags, isFavorite } = ctx.request.body;
    let status = 400;
    const responseObject = { err: '', succ: '' };
    if (name && typeof name === 'string' && tags && (Array.isArray(tags))) {
        try {
            await queries_1.updateListItem({ name, tags, isFavorite });
            // send updated record back to the client
            const result = await queries_1.findListItemByName(name);
            status = 200;
            responseObject.succ = { desc: 'updated record', result };
        }
        catch (err) {
            console.log(err);
            responseObject.err = err;
        }
    }
    else {
        responseObject.err = 'corrupted params passed';
    }
    ctx.response.status = status;
    ctx.response.body = responseObject;
    next();
}
exports.updateSelectedListItem = updateSelectedListItem;
//# sourceMappingURL=list-item-controller.js.map