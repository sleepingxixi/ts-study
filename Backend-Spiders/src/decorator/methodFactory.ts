enum MethodEnum {
    get = 'get',
    post = 'post'
}

function methodFactory(method: MethodEnum) {
    return function (path: string) {
        return function (target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key)
            Reflect.defineMetadata('method', method, target, key)
        }
    }
}

const get = methodFactory(MethodEnum.get)
const post = methodFactory(MethodEnum.post)

export { get, post, MethodEnum, methodFactory }