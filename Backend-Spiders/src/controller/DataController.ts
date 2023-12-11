import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { Response } from 'express';
import { controller, get, use } from '../decorator'
import { getResponseData } from '../utils/util'
import Analyzer from '../utils/analyzer';
import Spider from '../utils/spider';
import { RequestWithBody } from './LoginController'
import checkLogin from '../middleware/checkLogin'
import testLogin from '../middleware/testLogin';

@controller('/api')
export class DataController {
    @get('/getData')
    @use(checkLogin)
    @use(testLogin)
    getData(req: RequestWithBody, res: Response) {
        const secret = "secretKey";
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
        const analyzer = Analyzer.getInstance();
        const spider = new Spider(url, analyzer);
        res.send(getResponseData<responseResult.getData>(true));
    }
    @get('/showData')
    @use(checkLogin)
    showData(req: RequestWithBody, res: Response) {
        try {
            const filePath = path.resolve(__dirname, '../../data/courseInfo.json');
            const result = fs.readFileSync(filePath, 'utf-8');
            res.json(getResponseData<responseResult.showData>(JSON.parse(result)));
        } catch (e) {
            res.send(getResponseData<responseResult.showData>({}, '获取数据成功'))
        }
    }

}