// 这个文件的主要功能是：通过获取到的html进行分析处理，至于如何获取以及存储，由其他文件决定
// 单例模式要求不能在外部实例化，因此需要把constructor进行私有化，并且类自身需要有一个静态变量
import cheerio from 'cheerio';
import fs from 'fs';
export interface AnalyzerType {
    analyze: (html: string, filePath: string) => string;
}

interface CourseInfo {
    title: string,
    count: number
}
interface ContentResult {
    time: number,
    data: CourseInfo[]
}
interface Content {
    [resultKey: number]: CourseInfo[]
}
class Analyzer implements AnalyzerType {
    static analyzer: Analyzer;
    public static getInstance() {
        if (!Analyzer.analyzer) {
            Analyzer.analyzer = new Analyzer();
        }
        return Analyzer.analyzer;
    }
    private getCourseInfo(html: string) {
        const $ = cheerio.load(html);
        const courseItems = $('.course-item');
        const couseInfo: CourseInfo[] = [];
        courseItems.map((index, item) => {
            const descs = $(item).find('.course-desc');
            const title = descs.eq(0).text();
            const desc = parseInt(descs.eq(1).text().split('：')[1], 10)
            couseInfo.push({
                title,
                count: desc
            })
        })
        const result: ContentResult = {
            time: (new Date()).getTime(),
            data: couseInfo,
        }
        return result;
    }

    private genenrateData(filePath: string, info: ContentResult) {
        let fileContent: Content = {};
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        fileContent[info.time] = info.data;
        return JSON.stringify(fileContent);
    }

    private constructor() {
    }

    public analyze(html: string, filePath: string) {
        const info = this.getCourseInfo(html);
        const data = this.genenrateData(filePath, info)
        return data;
    }

}
export default Analyzer;