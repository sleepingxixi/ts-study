"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Spider {
    getRawHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield superagent_1.default.get(this.url);
            return response.text;
        });
    }
    writeFile(content) {
        fs_1.default.writeFileSync(this.filePath, content);
    }
    generateCourseInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this.getRawHtml();
            const courseInfo = this.analyzer.analyze(html, this.filePath);
            this.writeFile(courseInfo);
        });
    }
    constructor(url, analyzer) {
        this.url = url;
        this.analyzer = analyzer;
        this.filePath = path_1.default.resolve(__dirname, '../data/courseInfo.json');
        this.generateCourseInfo();
    }
}
exports.default = Spider;
