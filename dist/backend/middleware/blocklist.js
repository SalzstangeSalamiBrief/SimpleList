"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1({ request: req, response: res }, next) {
    if (!(/127.0.0.1$/.test(req.ip))) {
        // not local
        res.status = 401;
        return;
    }
    await next();
}
exports.default = default_1;
//# sourceMappingURL=blocklist.js.map