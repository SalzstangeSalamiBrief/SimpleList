"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("@koa/router");
// TODO: What to do with any?
const router = new Router();
router
    .get('/:id', (ctx, next) => {
    console.log(`get listItem with id ${ctx.params.id}`);
    ctx.body = `get item ${ctx.params.id}`;
    next();
})
    .post('/', (ctx, next) => {
    // boyd got "name": Any and "tags"<Array>
    console.log(ctx.request.body);
    console.log('got post request');
    ctx.body = 'got post request';
    next();
})
    .patch('/:id', (ctx, next) => {
    console.log(`update listItem with id ${ctx.params.id}`);
    ctx.body = `update listItem with id ${ctx.params.id}`;
    next();
})
    .del('/:id', (ctx, next) => {
    console.log(`delete listItem with id ${ctx.params.id}`);
    ctx.body = ctx.params.id; // `delete listItem with id ${ctx.request.query.id}`;
    next();
});
exports.default = router;
//# sourceMappingURL=list-item.js.map