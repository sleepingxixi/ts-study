import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { controller, get, post } from '../decorator'
import { getResponseData } from '../utils/util'

export interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined;
    }
}

@controller('/')
export class LoginController {
    static isLogin(req: RequestWithBody) {
        return !!(req.session ? req.session.lpLogin : undefined);
    }

    @get('/')
    home(req: RequestWithBody, res: Response) {
        if (req.session && req.session.lpLogin) {
            res.send(`
                    <html>
                    <a href="/getData">获取数据</a>
                    <a href="/showData">展示数据</a>
                    <a href="/logout">退出</a>
                </html>
            `)
        } else {
            res.send(`
                <html>    
                    <body>      
                        <form method="post" action="/login">
                         <input type="password" name="password"></input>
                        <button>登录</button>
                        </form>
                    </body>
                </html>
            `);
        }
    }

    @get('/logout')
    logout(req: RequestWithBody, res: Response) {
        const isLogin = LoginController.isLogin(req);
        if (req.session && isLogin) {
            req.session.lpLogin = undefined;
        }
        res.send(getResponseData(true));
    }

    @post('/login')
    login(req: RequestWithBody, res: Response) {
        const isLogin = LoginController.isLogin(req);
        if (isLogin) {
            res.send("您已登录");
            return;
        }
        if (req.body.password === '123') {
            if (req.session) {
                req.session.lpLogin = true;
                res.send(getResponseData(true));
            }
        } else {
            res.send(getResponseData({}, "登录失败"))
        }
    }
}