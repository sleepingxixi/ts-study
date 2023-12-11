"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
// 这里需要引入这个文件
require("./controller/LoginController");
require("./controller/DataController");
var router_1 = __importDefault(require("./router"));
var app = (0, express_1.default)();
// bodyParser是用于解析request的body的，因为express的类型定义文件并没有完全声明body类型，因此需要额外的中间件去解析
app.use(body_parser_1.default.urlencoded({ extended: false }));
// app.use((req: Request, res: Response, next: NextFunction) => {
//     req.teachername = 'lee';
//     next();
// })
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['lpLogin'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
// 使用路由
app.use(router_1.default);
// 启动一个3001端口
app.listen(3001, function () {
    console.log("listen");
});
