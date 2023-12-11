///<reference path="./components.ts" />
// 上面的写法主要是为了在下面能够清晰的知道，Components的来源
import $ from 'jquery';
namespace Home {
    export class Page {
        constructor() {
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
    }
}

$(function () {
    console.log('123')
    $('body').html("<div>123</div>")
    new $.fn.init();
})


