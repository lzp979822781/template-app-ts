import Taro from '@tarojs/taro';
import pick from 'lodash/pick';

function UUID() {
    const s: Array<any> = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i += 1) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    // eslint-disable-next-line no-bitwise
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

    s[8] = "-";
    s[13] = "-";
    s[18] = "-";
    s[23] = "-";

    const uuid = s.join("");
    return uuid;
}

function addId(arr) {
    if (Array.isArray(arr)) {
        return arr.map(item => ({ ...item, id: UUID() }))
    }
    return arr;
}

export { UUID, addId };


interface UploadParam {
    header?: object;
    name?: string;
    url: string;
    timeout?: number;
    formData?: object,
    file: any,
    success?: () => any;
    fail?: () => any
}

interface Success {
    success: boolean,
    data?: any,
    error?: string
}

interface Fail {
    success: boolean,
    data?: any,
    error: any
}

function handleRnForm(uploadParam: UploadParam) {
    const newFormData = new FormData();
    const { formData = {}, name, file } = uploadParam;
    Object.keys(formData).forEach(key => newFormData.append(key, formData[key]));
    newFormData.append(name || 'file', file);
    return newFormData;
}

function handleRn(uploadParam: UploadParam) {
    const otherParam = pick(uploadParam, ['url', 'header'])
    return {
        body: handleRnForm(uploadParam),
        ...otherParam
    }
}

function handleOther(uploadParam: UploadParam) {
    return {
        other: uploadParam
    };
}

function jointParam(uploadParam: UploadParam) {
    return { rn: handleRn(uploadParam), other: handleOther(uploadParam) }
}

function rnUpload(reqParam) {
    const { url, header, body } = reqParam
    return new Promise((resolve) => {
        fetch(url, {
            method: 'POST',
            headers: header,
            credentials: 'include',
            body
        }).then(response => response.json())
            .then(res => {
                const result: Success = { data: res, success: true }
                resolve(result)
            }).catch(res => {
                const failRes: Fail = { error: res, success: false };
                resolve(failRes);
            })
    })
}

function commonUpload(reqParam) {
    const { file, url, formData, name = 'file' } = reqParam;
    const otherParam = pick(reqParam, ['timeout', 'header']);
    return new Promise((resolve) => {
        Taro.uploadFile({
            url,
            filePath: file.url,
            name,
            formData,
            ...otherParam,
            success: ({ data, statusCode, errMsg }) => {
                resolve({ data, success: true, error: errMsg, code: statusCode })
            },
            fail: res => {
                const failRes: Fail = { error: res, success: false };
                resolve(failRes);
            }
        })
    })

}

function upload(uploadParam: UploadParam) {
    const reqParam = jointParam(uploadParam);
    return new Promise(async (resolve) => {
        const isRn = Taro.getEnv().toLowerCase() === 'rn';
        const res = isRn ? await rnUpload(reqParam.rn) : await commonUpload(reqParam.other)
        resolve(res);
    })
}

export { upload };

const isRn = Taro.getEnv().toLowerCase() === 'rn';

export { isRn };

const hoverStyle = {
    opacity: 0.8
};

// const hoverStyle = "opacity: 0.8";

export { hoverStyle };

/**
    * 传入对象返回url参数
    * @param {Object} data {a:1}
    * @returns {string}
    */
function parseParam(data) {
    let url = '';
    for (const k in data) {
        const value = data[k] !== undefined ? data[k] : '';
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}

/**
 * 将url和参数拼接成完整地址
 * @param {string} url url地址
 * @param {Json} data json对象
 * @returns {string}
 */
function parseUrl(url, data) {
    //看原始url地址中开头是否带?，然后拼接处理好的参数
    return url += (url.indexOf('?') < 0 ? '?' : '') + parseParam(data)
}

export { parseUrl };

function debounce(fn, wait) {    
    let timeout = null; 
    return function() {        
        if(timeout !== null)   clearTimeout(timeout);        
        timeout = setTimeout(fn, wait);    
    }
}

export { debounce };

// 时间填充
function seriesNumberArray(days, start) {
    return Array.from(Array(days + 1).keys()).slice(start);
}

function fillId(arr, field = 'text') {
    const finalArr = arr.map(item => ({
        id: UUID(),
        [field]: item
    }))
    return [{ id: UUID(), [field]: '' }].concat(finalArr, [{ id: UUID(), [field]: '' }]);
}

function getCurrentDateArr() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day];
}

export { seriesNumberArray, fillId, getCurrentDateArr };