
import superagent from 'superagent';
import fs from 'fs';
import path from 'path';
import { AnalyzerType } from './analyzer';

class Spider {
    private filePath = path.resolve(__dirname, '../../data/courseInfo.json');
    async getRawHtml() {
        const response = await superagent.get(this.url)
        return response.text;
    }
    writeFile(content: string) {
        fs.writeFileSync(this.filePath, content)
    }
    async generateCourseInfo() {
        const html = await this.getRawHtml();
        const courseInfo = this.analyzer.analyze(html, this.filePath);
        this.writeFile(courseInfo);
    }
    constructor(private url: string, private analyzer: AnalyzerType) {
        this.generateCourseInfo();
    }
}

export default Spider;