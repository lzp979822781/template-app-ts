import Taro, { requirePlugin } from '@tarojs/taro';
import pick from 'lodash/pick';

const isWeapp = Taro.getEnv().toLowerCase() === 'weapp';
const wxPlugin = isWeapp && requirePlugin("loginPlugin");

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
    if(Array.isArray(arr)) {
        return arr.map(item => ({ ...item, id: UUID()}))
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
                const result: Success = { data:res, success: true }
                resolve(result)
            }).catch(res => {
                const failRes: Fail = { error:res, success: false };
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
                resolve({ data, success: true, error: errMsg, code: statusCode  })
            },
            fail: res => {
                const failRes: Fail = { error: res, success: false };
                resolve(failRes);
            }
        }) 
    })
    
}

function upload(uploadParam: UploadParam){
    const reqParam  = jointParam(uploadParam);
    return new Promise(async (resolve) => {
        const isRn = Taro.getEnv().toLowerCase() === 'rn';
        const res = isRn ? await rnUpload(reqParam.rn) : await commonUpload(reqParam.other)
        resolve(res);
    })
}

export { upload };

const isRn = Taro.getEnv().toLowerCase() === 'rn';

export { isRn };

// 微信路由相关
function toH5({ page, wxroute }) {
    if(!wxPlugin || !page) return;
    const url = wxPlugin.formH5Url({ page: decodeURIComponent(page), wxroute });
    Taro.navigateTo({ url})
}

export { toH5 };