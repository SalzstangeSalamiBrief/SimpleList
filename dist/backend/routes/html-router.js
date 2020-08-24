"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("@koa/router");
const path = require("path");
const fs = require("fs");
const router = new Router();
const indexHTMLFilepath = path.resolve(__dirname, '../../frontend/html/index.html');
const indexFile = fs.readFileSync(indexHTMLFilepath, { encoding: 'utf8' });
router
    .get('/', (ctx, next) => {
    ctx.status = 200;
    ctx.body = indexFile;
    next();
});
exports.default = router;
//# sourceMappingURL=html-router.js.map