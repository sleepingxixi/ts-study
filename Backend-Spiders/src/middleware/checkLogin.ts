import { Request, Response, NextFunction } from 'express';
// // 编写一个中间件
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    console.log("===checkLogin")
    const isLogin = !!(req.session ? req.session.lpLogin : undefined);
    if (!isLogin) {
        res.send("您尚未登录，请登录之后再进行此操作");
        return;
    }
    next();
}

export default checkLogin;