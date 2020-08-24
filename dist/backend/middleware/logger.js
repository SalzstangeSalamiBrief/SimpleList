"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calcTimePartials(time) {
    return time < 10 ? `0${time}` : String(time);
}
async function default_1({ request: req }, next) {
    const date = new Date();
    const dateString = `${calcTimePartials(date.getHours())}:${calcTimePartials(date.getMinutes())}:${calcTimePartials(date.getSeconds())}`;
    console.log(`${dateString} - Method: ${req.method} -  Sender: ${req.ip} - Target: ${req.url}`);
    await next();
}
exports.default = default_1;
//# sourceMappingURL=logger.js.map