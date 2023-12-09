"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 这个文件的主要功能是：通过获取到的html进行分析处理，至于如何获取以及存储，由其他文件决定
// 单例模式要求不能在外部实例化，因此需要把constructor进行私有化，并且类自身需要有一个静态变量
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var Analyzer = /** @class */ (function () {
    function Analyzer() {
    }
    Analyzer.getInstance = function () {
        if (!Analyzer.analyzer) {
            Analyzer.analyzer = new Analyzer();
        }
        return Analyzer.analyzer;
    };
    Analyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.course-item');
        var couseInfo = [];
        courseItems.map(function (index, item) {
            var descs = $(item).find('.course-desc');
            var title = descs.eq(0).text();
            var desc = parseInt(descs.eq(1).text().split('：')[1], 10);
            couseInfo.push({
                title: title,
                count: desc
            });
        });
        var result = {
            time: (new Date()).getTime(),
            data: couseInfo,
        };
        return result;
    };
    Analyzer.prototype.genenrateData = function (filePath, info) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[info.time] = info.data;
        return JSON.stringify(fileContent);
    };
    Analyzer.prototype.analyze = function (html, filePath) {
        var info = this.getCourseInfo(html);
        var data = this.genenrateData(filePath, info);
        return data;
    };
    return Analyzer;
}());
exports.default = Analyzer;
