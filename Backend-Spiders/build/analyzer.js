"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 这个文件的主要功能是：通过获取到的html进行分析处理，至于如何获取以及存储，由其他文件决定
// 单例模式要求不能在外部实例化，因此需要把constructor进行私有化，并且类自身需要有一个静态变量
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
class Analyzer {
    static getInstance() {
        if (!Analyzer.analyzer) {
            Analyzer.analyzer = new Analyzer();
        }
        return Analyzer.analyzer;
    }
    getCourseInfo(html) {
        const $ = cheerio_1.default.load(html);
        const courseItems = $('.course-item');
        const couseInfo = [];
        courseItems.map((index, item) => {
            const descs = $(item).find('.course-desc');
            const title = descs.eq(0).text();
            const desc = parseInt(descs.eq(1).text().split('：')[1], 10);
            couseInfo.push({
                title,
                count: desc
            });
        });
        const result = {
            time: (new Date()).getTime(),
            data: couseInfo,
        };
        return result;
    }
    genenrateData(filePath, info) {
        let fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[info.time] = info.data;
        return JSON.stringify(fileContent);
    }
    constructor() {
    }
    analyze(html, filePath) {
        const info = this.getCourseInfo(html);
        const data = this.genenrateData(filePath, info);
        return data;
    }
}
exports.default = Analyzer;
