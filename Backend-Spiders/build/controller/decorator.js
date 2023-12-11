"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.use = exports.post = exports.get = exports.controller = void 0;
var express_1 = require("express");
var MethodEnum;
(function (MethodEnum) {
    MethodEnum["get"] = "get";
    MethodEnum["post"] = "post";
})(MethodEnum || (MethodEnum = {}));
var router = (0, express_1.Router)();
exports.router = router;
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        var handler = target.prototype[key];
        if (path && method && handler) {
            if (middleware) {
                // 这里可以给路由添加中间件
                router[method](path, middleware, handler);
            }
            else {
                router[method](path, handler);
            }
        }
    }
}
exports.controller = controller;
function methodFactory(method) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', method, target, key);
        };
    };
}
var get = methodFactory(MethodEnum.get);
exports.get = get;
var post = methodFactory(MethodEnum.post);
exports.post = post;
function use(middlewareHandler) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middlewareHandler, target, key);
    };
}
exports.use = use;
