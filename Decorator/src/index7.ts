// 装饰器实战小例子
// 通过装饰器，可以统一为函数进行catch
const userInfo: any = undefined;

function catchErrorDecorator(msg: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const fn = descriptor.value;
        descriptor.value = function () {
            try {
                fn();
            } catch (e) {
                console.log(msg)
            }
        }
    }
}

class Test7 {
    @catchErrorDecorator('userInfo.name 不存在')
    getName() {
        return userInfo.name;
    }
    @catchErrorDecorator('userInfo.age 不存在')
    getAge() {
        return userInfo.age;
    }
}

const test7 = new Test7();
test7.getAge();
test7.getName();