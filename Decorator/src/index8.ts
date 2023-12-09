// 装饰器+Reflect-metadata
import 'reflect-metadata';

function showData(target: any) {
    for (let key in target.prototype) {
        console.log(key)
        const data = Reflect.getMetadata('data', target.prototype, key)
        console.log(data);
    }
}

function setData(dataKey: string, dataValue: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata(dataKey, dataValue, target, key)
    }

}

@showData
class Test8 {

    @Reflect.metadata('data', 'name')
    getName() { }

    @setData('data', 'age')
    getAge() { }
}

const test8 = new Test8();

