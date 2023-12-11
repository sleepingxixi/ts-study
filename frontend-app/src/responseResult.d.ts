declare namespace responseResult {

    interface CourseItem {
        title: string,
        count: number
    }
    type isLogin = boolean;
    type login = boolean;
    type logout = boolean;
    type getData = boolean;
    type showData = { [key: string]: CourseItem[] };

}