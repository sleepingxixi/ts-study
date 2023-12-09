// 参数装饰器
// 第一个参数是原型，第二个参数是参数所在的函数的名称，第三个是参数的位置
function paramsDecorator(target: any, functionName: string, paramsIndex: number) {
    console.log(target, functionName, paramsIndex) // {} getName 0
}

class Test6 {
    getName(@paramsDecorator name: string, age: number) {
        console.log(name, age)
    }
}
const test6 = new Test6();
test6.getName("li", 18);