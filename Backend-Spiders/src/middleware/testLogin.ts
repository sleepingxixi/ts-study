import { Request, Response, NextFunction } from 'express';
// // 编写一个中间件
const testLogin = (req: Request, res: Response, next: NextFunction) => {
    console.log("testLogin====")
    next();
}

export default testLogin;