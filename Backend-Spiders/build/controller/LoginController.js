"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
require("reflect-metadata");
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController_1 = LoginController;
    LoginController.isLogin = function (req) {
        return !!(req.session ? req.session.lpLogin : undefined);
    };
    LoginController.prototype.home = function (req, res) {
        if (req.session && req.session.lpLogin) {
            res.send("\n                    <html>\n                    <a href=\"/getData\">\u83B7\u53D6\u6570\u636E</a>\n                    <a href=\"/showData\">\u5C55\u793A\u6570\u636E</a>\n                    <a href=\"/logout\">\u9000\u51FA</a>\n                </html>\n            ");
        }
        else {
            res.send("\n                <html>    \n                    <body>      \n                        <form method=\"post\" action=\"/login\">\n                         <input type=\"password\" name=\"password\"></input>\n                        <button>\u767B\u5F55</button>\n                        </form>\n                    </body>\n                </html>\n            ");
        }
    };
    LoginController.prototype.logout = function (req, res) {
        var isLogin = LoginController_1.isLogin(req);
        if (req.session && isLogin) {
            req.session.lpLogin = undefined;
        }
        res.send((0, util_1.getResponseData)(true));
    };
    LoginController.prototype.login = function (req, res) {
        var isLogin = LoginController_1.isLogin(req);
        if (isLogin) {
            res.send("您已登录");
            return;
        }
        if (req.body.password === '123') {
            if (req.session) {
                req.session.lpLogin = true;
                res.send((0, util_1.getResponseData)(true));
            }
        }
        else {
            res.send((0, util_1.getResponseData)({}, "登录失败"));
        }
    };
    var LoginController_1;
    __decorate([
        (0, decorator_1.get)('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "home", null);
    __decorate([
        (0, decorator_1.get)('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    __decorate([
        (0, decorator_1.post)('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    LoginController = LoginController_1 = __decorate([
        (0, decorator_1.controller)('/')
    ], LoginController);
    return LoginController;
}());
exports.LoginController = LoginController;
