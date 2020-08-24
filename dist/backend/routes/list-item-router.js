"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("@koa/router");
const Controller = require("./list-item-controller");
const router = new Router();
router
    .get('/', Controller.getAll)
    .get('/:name', Controller.getListItem)
    .post('/', Controller.createNewListItem)
    .put('/', Controller.updateSelectedListItem)
    .del('/', Controller.deleteSelectedListItem);
exports.default = router;
//# sourceMappingURL=list-item-router.js.map