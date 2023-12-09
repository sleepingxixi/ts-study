// 类装饰器写法
function testDecoratorFun2() {
    return function <T extends new (...args: any) => any>(constractor: T) {
        return class extends constractor {
            name = 'ping';
            getName() {
                return this.name;
            }

        }
    }
}

const Test = testDecoratorFun2()(class {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
})


const test1 = new Test('li');
console.log("test1=", test1.getName());
