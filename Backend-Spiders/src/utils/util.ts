
interface ResponseType<T> {
    success: boolean;
    errMsg?: string;
    data: T;
}
const getResponseData = <T>(data: T, errMsg?: string): ResponseType<T> => {
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