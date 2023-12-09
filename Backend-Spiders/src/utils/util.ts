
interface ResponseType {
    success: boolean;
    errMsg?: string;
    data: any;
}
const getResponseData = (data: any, errMsg?: string): ResponseType => {
    if (errMsg) {
        return {
            success: false,
            errMsg,
            data
        }
    }
    return {
        success: true,
        data
    }

}


export { getResponseData }