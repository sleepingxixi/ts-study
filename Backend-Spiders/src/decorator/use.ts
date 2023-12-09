export function use(middlewareHandler: any) {
    return function (target: any, key: string) {
        const middlewareArr = Reflect.getMetadata('middlewares', target, key) || [];
        middlewareArr.push(middlewareHandler);
        Reflect.defineMetadata('middlewares', middlewareArr, target, key)
    }
}