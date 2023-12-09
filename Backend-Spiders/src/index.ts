import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import CookieSession from 'cookie-session';
// 这里需要引入这个文件
import './controller/LoginController';
import './controller/DataController';
import router from './router';

const app = express();
// bodyParser是用于解析request的body的，因为express的类型定义文件并没有完全声明body类型，因此需要额外的中间件去解析
app.use(bodyParser.urlencoded({ extended: false }))
// app.use((req: Request, res: Response, next: NextFunction) => {
//     req.teachername = 'lee';
//     next();

// })
app.use(CookieSession({
    name: 'session',
    keys: ['lpLogin'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
// 使用路由
app.use(router);

// 启动一个3001端口
app.listen(3001, () => {
    console.log("listen")
})