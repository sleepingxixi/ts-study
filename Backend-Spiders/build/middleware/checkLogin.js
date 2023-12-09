"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// // 编写一个中间件
var checkLogin = function (req, res, next) {
    console.log("===checkLogin");
    var isLogin = !!(req.session ? req.session.lpLogin : undefined);
    if (!isLogin) {
        res.send("您尚未登录，请登录之后再进行此操作");
        return;
    }
    next();
};
exports.default = checkLogin;
