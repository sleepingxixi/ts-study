// 访问器的装饰器
function visitorDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    // descriptor.writable = false;
}
class Test4 {
    private _name: string;
    constructor(name: string) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    @visitorDecorator
    set name(name: string) {
        this._name = name;
    }
}

const test4 = new Test4('Li');
console.log(test4.name);
test4.name = 'Ping';
console.log(test4.name);