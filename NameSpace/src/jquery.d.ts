// // 通过declare 声明全局的变量或者函数
// // 声明全局变量
// declare var $: (params: () => void) => void;

// // 声明全局函数
// declare function $(params: () => void): void;
// // 可以通过重载的方式声明不同的函数
// declare function $(selector: string): {
//     html: (str: string) => {}
// }
// // 如何定义对象类型，对类进行类型定义，对命名空间的嵌套
// declare namespace $ {
//     namespace fn {
//         class init { }
//     }
// }

// 如何使用模块化的写法呢？
declare module 'jquery' {
    function $(params: () => void): void;
    // 可以通过重载的方式声明不同的函数
    function $(selector: string): {
        html: (str: string) => {}
    }
    // 如何定义对象类型，对类进行类型定义，对命名空间的嵌套
    namespace $ {
        namespace fn {
            class init { }
        }
    }

    export = $;
}