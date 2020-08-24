"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const KoaRouter = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");
const serve = require("koa-static");
const path = require("path");
const logger_1 = require("./backend/middleware/logger");
const blocklist_1 = require("./backend/middleware/blocklist");
require("dotenv/config");
const list_item_router_1 = require("./backend/routes/list-item-router");
const port = process.env.PORT;
function startServer() {
    const app = new Koa();
    const api = new KoaRouter();
    // Add middlewares
    app.use(bodyParser());
    app.use(logger_1.default);
    app.use(blocklist_1.default);
    // serve index file via koa-static
    app.use(serve(path.resolve(__dirname, './frontend/'), { index: './html/index.html' }));
    api.use('/api/list-item', list_item_router_1.default.routes());
    app.use(api.routes());
    // start server
    app.listen(process.env.PORT);
    console.log(`App is Listening on ${port}`);
}
// connect to db
mongoose
    .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('connected to MongoDB'))
    .then(() => {
    // config and start server
    startServer();
})
    .catch((err) => console.log(err));
//# sourceMappingURL=app.js.map