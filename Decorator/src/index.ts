function testDecoratorFun(flag: boolean) {
    if (flag) {
        return function (constractor: any) {
            console.log('decorator');
        }
    }
    return function (constractor: any) {
    }

}


// function testDecoratorFun1(constractor: any) {
//     console.log('decorator1');
// }

@testDecoratorFun(true)
// @testDecoratorFun1
class TestDecorator {

}

const test = new TestDecorator();