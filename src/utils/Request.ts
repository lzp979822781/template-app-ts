import hmacSha256 from "crypto-js/hmac-sha256";
import Taro from "@tarojs/taro";
import pick from "lodash/pick";

// const host = 'https://yaoser.jd.com/';
// const JDYJCMainURL = 'https://api.m.jd.com/api'
// const JDYJCMainURL = JDConfig.betaEnv ? 'http://beta-api.m.jd.com/api' : 'https://api.m.jd.com/api';
const requestTimeout = 15000;
const secretKey = "02460169765544ce87b4c67fc1d08594"; //签名秘钥
const currentEnv = Taro.getEnv(); // 获取当前环境平台

const contentTypeObj = {
    wwwForm: "application/x-www-form-urlencoded;charset=utf-8",
    applicationJson: "application/json"
};

const mainURL = "http://beta-api.m.jd.com/api";

function genBody(para) {
    const paraNew = {
        // data: para,
        // contentType,
        ...para
    };
    return Object.keys(para).length ? { body: JSON.stringify(paraNew) } : {};
}

function initParam(functionId, para, contentType) {
    //存放所有的公共参数
    const objc = {
        functionId,
        t: Date.parse(Date()),
        contentType,
        appid: "yjc_app"
    };
    return Object.assign({}, objc, genBody(para));
}

function dealWithParam(objc) {
    const newParams = Object.assign(
        {},
        pick(objc, ["functionId", "t", "appid", "body"])
    );
    return newParams;
}

function mapKeySortASC(objc) {
    const newkeyArray = Object.keys(objc).sort();
    return newkeyArray; //返回排好序的新数组
}

function appendSingnParaString(newParams) {
    const paraKeyArray = mapKeySortASC(newParams);
    return paraKeyArray
        .reduce((total, key) => `${total}&${newParams[key]}`, "")
        .substring(1);
}

function dealPostBody(url, param, contentType) {
    //0、参数整理为字典类型
    const objc = initParam(url, param, contentType);
    //1、参数整理（公参、业务参数）
    const newParams = dealWithParam(objc);
    //2、ASCII 顺序拼接签名参数
    const paraAppendString = appendSingnParaString(newParams);
    //3、参数签名
    if (currentEnv != "WEB") {
        const hmactring = hmacSha256(paraAppendString, secretKey);
        return Object.assign({}, newParams, { sign: hmactring });
    } else {
        return Object.assign({}, newParams);
    }
}

function convertDicToKeyValueString(postBody) {
    return Object.keys(postBody)
        .reduce((total: string, key) => `${total}&${key}=${postBody[key]}`, "")
        .substring(1);
}

function getURL(functionId, param, contentType) {
    //0、参数整理为字典类型
    const objc = initParam(functionId, param, contentType);
    //1、参数整理（公参、业务参数）
    const newParams = dealWithParam(objc);
    //2、ASCII 顺序拼接签名参数
    const paraAppendString = appendSingnParaString(newParams);
    //3、参数签名
    const hmactring = hmacSha256(paraAppendString, secretKey);
    //4、参数拼接URL链接
    const paramString = convertDicToKeyValueString(newParams);
    let urlString = mainURL + "?" + paramString;
    //5、URL链接进行编码
    if (currentEnv != "WEB") {
        urlString = encodeURI(urlString + "&sign=" + hmactring);
    } else {
        urlString = encodeURI(urlString);
    }

    return urlString; //返回URL
}

function get(url: string, param: object) {
    const contentType = contentTypeObj.wwwForm;
    const getUrl = getURL(url, param, contentType);
    return Taro.request({
        url: getUrl,
        method: "GET",
        header: {
            Accept: "application/json",
            "Content-Type": contentType,
            Cookie: ""
        },
        timeout: requestTimeout
    });
}

function post(url: string, param: object) {
    let contentType = contentTypeObj.wwwForm;

    //获取三级地址，方法为post，请求头特殊处理
    if ("yjc_address_subAddress" === url) {
        contentType = contentTypeObj.wwwForm;
    } else {
        contentType = contentTypeObj.applicationJson;
    }
    const postBody = dealPostBody(url, param, contentType);
    const bodyString = convertDicToKeyValueString(postBody);
    const requestPara = encodeURI(bodyString);

    return Taro.request({
        url: mainURL,
        method: "POST",
        data: requestPara,
        header: {
            Accept: "application/json",
            "Content-Type": contentTypeObj.wwwForm,
            Cookie: ""
        },
        timeout: requestTimeout
    });
}

function futch(
    url,
    opts: { method: string; headers: any; body: any } = {
        method: "get",
        headers: {},
        body: {}
    },
    onProgress,
    successResponse,
    failResponse
) {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open(opts.method, url);
        for (const k in opts.headers) {
            xhr.setRequestHeader(k, opts.headers[k]);
        }
        xhr.onreadystatechange = () => {
            if (xhr.status === 200) {
                successResponse(xhr);
            } else {
                failResponse(xhr);
            }
        };
        xhr.onerror = rej;
        if (xhr.upload && onProgress) {
            xhr.upload.onprogress = onProgress;
        }
        xhr.send(opts.body);
    });
}

function uploadImage(url, path: any, progressFunction) {
    const commonParams = {};
    const allCookies = "";
    const uploadMediaData = new FormData();
    return new Promise(function(resolve, reject) {
        // file先转换为字符串防止警告
        const file = JSON.stringify({
            uri: path,
            type: "multipart/form-data",
            name: "certUpImg.jpg"
        });
        uploadMediaData.append("file", JSON.parse(file));
        const host = "http://yaoser.jd.com";
        const reqUrl = host + url + "?" + commonParams;
        // 上传成功
        const successResponse = xhr => {
            //这个key 就是你上传文件在oss 的地址了，
            if (xhr._response) {
                const res = new Function("return " + xhr._response)();
                if (res) {
                    resolve(res);
                }
            }
        };
        //上传失败
        const failResponse = xhr => {
            reject(xhr);
        };

        //开始上传
        futch(
            reqUrl,
            {
                method: "POST",
                body: uploadMediaData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Cookie: allCookies
                }
            },
            progressEvent => {
                // progress 就是上穿的进度， 更新 state 里面的uploadProgress
                const progress = progressEvent.loaded / progressEvent.total;
                progressFunction(progress);
            },
            xhr => successResponse(xhr),
            xhr => failResponse(xhr)
        );
    });
}

export { get, post, uploadImage };
