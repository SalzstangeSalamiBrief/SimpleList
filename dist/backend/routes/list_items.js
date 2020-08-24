"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("@koa/router");
// TODO: What to do with any?
const router = new Router();
router
    .get('/:id', (ctx, next) => {
    console.log(`get listItem with id ${ctx.request.query.id}`);
    ctx.body = 'get all list-Items';
    next();
})
    .post('/listItem', (ctx, next) => {
    console.log('got post request');
    ctx.body = 'got post request';
    next();
})
    .put('/listItem/:id', (ctx, next) => {
    console.log(`update listItem with id ${ctx.request.query.id}`);
    ctx.body = `update listItem with id ${ctx.request.query.id}`;
    next();
})
    .del('/listItem:id', (ctx, next) => {
    console.log(`delete listItem with id ${ctx.request.query.id}`);
    ctx.body = `delete listItem with id ${ctx.request.query.id}`;
    next();
});
exports.default = router;
//# sourceMappingURL=list_items.js.map