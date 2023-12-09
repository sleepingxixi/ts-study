"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// // 编写一个中间件
var testLogin = function (req, res, next) {
    console.log("testLogin====");
    next();
};
exports.default = testLogin;
