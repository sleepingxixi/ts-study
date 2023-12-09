type DemoType = { x: number, y: number };

function test1(t1: DemoType, t2: DemoType) {
    return [t1.x - t2.x, t1.y - t2.y];
}

const [x, y] = test1({ x: 1, y: 2 }, { x: 3, y: 4 });
console.log(x, y);

const teacherName: string = '';

type Fish = {
    swim: () => {}
}
type Bird = {
    fly: () => {}
}
// in 类型收窄
function action(animal: Fish | Bird) {
    if ('swim' in animal) {
        return animal.swim()
    }
    return animal.fly()
}

// Instanceof 语法下的类型收窄
function test2(params: Date | string) {
    if (params instanceof Date) {
        return params.getTime();
    }
    return params.toUpperCase();
}

// 通过 is 判断的方式，做类型收窄，is的形式叫做类型陈述语法

// 虽然已经做了判断，但是这种情况下，是无法做到类型收窄
// function isFish(animal: Fish | Bird): boolean {
//     if ((animal as Fish).swim !== undefined) {
//         return true;
//     }
//     return false;
// }

// 当返回的类型定义成is的语法的时候，就可以实现类型收窄了
function isFish(animal: Fish | Bird): animal is Fish {
    if ((animal as Fish).swim !== undefined) {
        return true;
    }
    return false;
}
function test3(animal: Fish | Bird) {
    if (isFish(animal)) {
        return animal.swim();
    }
    return animal.fly();
}

// 定义带有属性的函数类型
interface FunctionWithAttribute {
    name: string,
    (params: string): void;
}

const test4: FunctionWithAttribute = (params: string) => {
    console.log(params)
}
test4.name = '1'

// 构造函数的类型
interface FunctionWithConstractor {
    new(params: string): void;
}

function test5(outerClass: FunctionWithConstractor) {
    const instance = new outerClass('test')
}

class TestFive {
    name: string;
    constructor(str: string) {
        this.name = str
    }
}
test5(TestFive)


// 泛型
function getArrayFirstItem<T>(arr: T[]): T {
    return arr[0];
}

const numberArr = [0, 1, 2]
const res1 = getArrayFirstItem(numberArr);

const stringArr = ['0', '1', '2']
const res2 = getArrayFirstItem(stringArr);



// 正常情况下，对象的属性是可以重新赋值的
// 如果希望对象赋值了一次之后，不能再修改，则可以使用readonly
interface Person {
    name: string,
    age: number,
    readonly gender: 'male' | 'female'
}
const p1: Person = { name: 'petter', age: 18, gender: 'female' }
p1.name = 'lisa'
p1.gender = 'male'

// 如何给对象添加属性
interface Person1 {
    [key: string]: number | string;
    name: string;
}

const p2: Person1 = {
    age: 18,
    name: '1',
}

// 多个继承,可以使用extends 或者& 
interface Circle {
    radius: number
}
interface Colorful {
    color: string
}
interface CircleColor extends Circle, Colorful { }
const circleColor: CircleColor = {
    color: 'red',
    radius: 10
}
// 交叉类型
type CircleColor1 = Circle & Colorful;
const circleColor1: CircleColor1 = {
    color: 'yellow',
    radius: 12
}

// 泛型
interface ObjectType<T> {
    name: T
}
const obj1: ObjectType<string> = {
    name: 'li'
}
const obj2: ObjectType<number> = {
    name: 1
}

type ObjectType1<T> = T | null;
type ObjectType2<T> = T | T[]
// ObjectType3<T> 与 ObjectType4<T> 效果是一样的
type ObjectType3<T> = ObjectType2<T> | null;
type ObjectType4<T> = ObjectType1<ObjectType2<T>>;

const arr1: Array<string> = ['1', '2']

// extends 和泛型结合，可以用来扩展属性
interface Persion2 {
    name: string
}
// 此时，我希望声明的类型不只是name这个属性，还有其他的属性
function getPersonInfo<T extends Persion2>(p: T) {
    return p.name;
}
const p3 = getPersonInfo({ name: 'lee', age: 18 })

// keyof 如果我希望类型是某一个类型的key
interface Person3 {
    name: string,
    age: number,
    gender: string
}

const getPerson3Info = <T extends keyof Person3>(p: Person3, key: T) => {
    return p[key]
}
getPerson3Info({ name: 'lee', age: 18, gender: 'female' }, 'age')

// 如何使用条件判断
interface ReturnId {
    id: number
}

interface ReturnName {
    name: string
}
// function getResult(key: number): ReturnId;
// function getResult(key: string): ReturnName;
type Returns<T> = T extends number ? ReturnId : ReturnName;
function getResult<T extends number | string>(key: T): Returns<T>;
function getResult(key: number | string): ReturnId | ReturnName {
    if (typeof key === 'string') {
        return { name: key }
    }
    return { id: key }
}

const res3 = getResult("1")

//映射类型，主要使用场景，想沿用之前的一些参数，但是修改某些类型的限制
// 例如，我希望把下面这个类型定义的字段变成非readonly，以及gender必填
interface Person4 {
    readonly name: string;
    readonly age: number;
    gender?: 'male' | 'female'
}

// 通过-的方式，把readonly和？去掉
type ChangePersonType<T> = {
    - readonly [property in keyof T]-?: T[property]
}

type Person5 = ChangePersonType<Person4>

const p4: Person5 = {
    name: '1',
    age: 2,
    gender: 'female'
}

// 高级映射，比如说，我希望映射过来的项中，去除某一项
interface Person6 {
    name: string;
    age: number;
    gender: 'male' | 'female'
}// 通过-的方式，把readonly和？去掉
type ChangePerson6Type<T> = {
    [property in keyof T as Exclude<property, 'gender'>]: T[property]
}
// type Person7 = {
//     name: string;
//     age: number;
// }
type Person7 = ChangePerson6Type<Person6>

// 如果希望把类型的字段都映射成指定的函数
type ChangePersonType6<T> = {
    [property in keyof T as `get${Capitalize<string & property>}`]: () => T[property]
}
// type Person8 = {
//     getName: () => string;
//     getAge: () => number;
//     getGender: () => "male" | "female";
// }
type Person8 = ChangePersonType6<Person6>

//如果希望针对不同的类型，返回不同的函数
type CircleEven = {
    kind: 'circle';
    x: number;
    y: number
}
type SquareEven = {
    kind: 'square',
    x: number,
    y: number
}

type GeneratorFunction1<T extends { kind: string }> = {
    [Event in T as  Event['kind']]: (event: Event) => void
}
// type generatorFun1 = {
//     circle: (event: CircleEven) => void;
//     square: (event: SquareEven) => void;
// }
type generatorFun1 = GeneratorFunction1<CircleEven | SquareEven>