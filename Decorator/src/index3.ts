// 函数装饰器，在类创建完成之后，立即执行函数装饰器
// 普通函数：target对应的是prototype
// 静态函数：target对应的是类的构造函数
// key对应的是装饰的函数的名字
// description对应的是函数的一些定义，可以在装饰器上面对需要装饰的函数进行修改：
//interface PropertyDescriptor {
//     configurable?: boolean;
//     enumerable?: boolean;
//     value?: any;
//     writable?: boolean;
//     get?(): any;
//     set?(v: any): void;
// }
function functionDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log(target, key, descriptor)
    descriptor.value = function () {
        return 'ping'
    }
}

class Test2 {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    @functionDecorator
    getName() {
        return this.name;
    }
}

const test3 = new Test2('li');
console.log("name==", test3.getName())
