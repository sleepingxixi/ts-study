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
    LoginController.prototype.isLogin = function (req, res) {
        res.send((0, util_1.getResponseData)(LoginController_1.isLogin(req)));
    };
    // @get('/')
    // home(req: RequestWithBody, res: Response) {
    //     if (req.session && req.session.lpLogin) {
    //         res.send(`
    //                 <html>
    //                 <a href="/api/getData">获取数据</a>
    //                 <a href="/api/showData">展示数据</a>
    //                 <a href="/api/logout">退出</a>
    //             </html>
    //         `)
    //     } else {
    //         res.send(`
    //             <html>    
    //                 <body>      
    //                     <form method="post" action="/api/login">
    //                      <input type="password" name="password"></input>
    //                     <button>登录</button>
    //                     </form>
    //                 </body>
    //             </html>
    //         `);
    //     }
    // }
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
            res.send((0, util_1.getResponseData)(true));
            return;
        }
        if (req.body.password === '123') {
            if (req.session) {
                req.session.lpLogin = true;
                res.send((0, util_1.getResponseData)(true));
            }
        }
        else {
            res.send((0, util_1.getResponseData)(false, "登录失败"));
        }
    };
    var LoginController_1;
    __decorate([
        (0, decorator_1.get)('/isLogin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "isLogin", null);
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
        (0, decorator_1.controller)('/api')
    ], LoginController);
    return LoginController;
}());
exports.LoginController = LoginController;
