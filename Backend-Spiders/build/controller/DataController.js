"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
require("reflect-metadata");
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var analyzer_1 = __importDefault(require("../utils/analyzer"));
var spider_1 = __importDefault(require("../utils/spider"));
var checkLogin_1 = __importDefault(require("../middleware/checkLogin"));
var testLogin_1 = __importDefault(require("../middleware/testLogin"));
var DataController = /** @class */ (function () {
    function DataController() {
    }
    DataController.prototype.getData = function (req, res) {
        var secret = "secretKey";
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=".concat(secret);
        var analyzer = analyzer_1.default.getInstance();
        var spider = new spider_1.default(url, analyzer);
        res.send((0, util_1.getResponseData)(true));
    };
    DataController.prototype.showData = function (req, res) {
        try {
            var filePath = path_1.default.resolve(__dirname, '../../data/courseInfo.json');
            var result = fs_1.default.readFileSync(filePath, 'utf-8');
            res.json((0, util_1.getResponseData)(JSON.parse(result)));
        }
        catch (e) {
            res.send((0, util_1.getResponseData)({}, '获取数据成功'));
        }
    };
    __decorate([
        (0, decorator_1.get)('/getData'),
        (0, decorator_1.use)(checkLogin_1.default),
        (0, decorator_1.use)(testLogin_1.default),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], DataController.prototype, "getData", null);
    __decorate([
        (0, decorator_1.get)('/showData'),
        (0, decorator_1.use)(checkLogin_1.default),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], DataController.prototype, "showData", null);
    DataController = __decorate([
        (0, decorator_1.controller)('/api')
    ], DataController);
    return DataController;
}());
exports.DataController = DataController;
