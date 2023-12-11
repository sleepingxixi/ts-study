import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { controller, get, post } from '../decorator'
import { getResponseData } from '../utils/util'

export interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined;
    }
}

@controller('/api')
export class LoginController {
    static isLogin(req: RequestWithBody) {
        return !!(req.session ? req.session.lpLogin : undefined);
    }
    @get('/isLogin')
    isLogin(req: RequestWithBody, res: Response) {
        res.send(getResponseData<responseResult.isLogin>(LoginController.isLogin(req)));
    }

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

    @get('/logout')
    logout(req: RequestWithBody, res: Response) {
        const isLogin = LoginController.isLogin(req);
        if (req.session && isLogin) {
            req.session.lpLogin = undefined;
        }
        res.send(getResponseData<responseResult.logout>(true));
    }

    @post('/login')
    login(req: RequestWithBody, res: Response) {
        const isLogin = LoginController.isLogin(req);
        if (isLogin) {
            res.send(getResponseData<responseResult.login>(true));
            return;
        }
        if (req.body.password === '123') {
            if (req.session) {
                req.session.lpLogin = true;
                res.send(getResponseData<responseResult.login>(true));
            }
        } else {
            res.send(getResponseData<responseResult.login>(false, "登录失败"))
        }
    }
}