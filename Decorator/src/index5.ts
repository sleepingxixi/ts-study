// 属性装饰器
// 属性装饰器只接收两个参数，原型，属性名
function propertyDecorator(target: any, key: string): any {
    // 如果希望像函数一样可以修改一些描述相关的属性，如何实现？
    // const descriptor: PropertyDescriptor = {
    //     writable: true
    // }
    // return descriptor;

    // 属性装饰器只能修改原型上面的值，无法修改实例上面的值
    target[key] = "ping"
}

class Test5 {
    @propertyDecorator
    name = 'Li'
}

const test5 = new Test5();
console.log("test5=", test5.name) // Li
console.log("test5===", (test5 as any).__proto__.name) // ping