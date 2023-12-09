import router from '../router'
import { RequestHandler } from 'express';

enum MethodEnum {
    get = 'get',
    post = 'post'
}


export function controller(root: string) {
    return function (target: new (...args: any[]) => any): void {
        for (let key in target.prototype) {
            const path: string = Reflect.getMetadata('path', target.prototype, key);
            const method: MethodEnum = Reflect.getMetadata('method', target.prototype, key);
            const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key);
            const handler: RequestHandler = target.prototype[key];
            if (path && method) {
                const fullPath = root === '/' ? path : `${root}${path}`
                if (middlewares) {
                    // 这里可以给路由添加中间件
                    router[method](fullPath, ...middlewares, handler);
                } else {
                    router[method](fullPath, handler);
                }
            }
        }
    }
}
