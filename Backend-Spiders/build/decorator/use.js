"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
function use(middlewareHandler) {
    return function (target, key) {
        var middlewareArr = Reflect.getMetadata('middlewares', target, key) || [];
        middlewareArr.push(middlewareHandler);
        Reflect.defineMetadata('middlewares', middlewareArr, target, key);
    };
}
exports.use = use;
