"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodFactory = exports.MethodEnum = exports.post = exports.get = void 0;
var MethodEnum;
(function (MethodEnum) {
    MethodEnum["get"] = "get";
    MethodEnum["post"] = "post";
})(MethodEnum || (exports.MethodEnum = MethodEnum = {}));
function methodFactory(method) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', method, target, key);
        };
    };
}
exports.methodFactory = methodFactory;
var get = methodFactory(MethodEnum.get);
exports.get = get;
var post = methodFactory(MethodEnum.post);
exports.post = post;
