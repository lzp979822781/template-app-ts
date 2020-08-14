import hmacSha256 from 'crypto-js/hmac-sha256'
import Taro from "@tarojs/taro";
import pick from "lodash/pick";



// const host = 'https://yaoser.jd.com/';
// const JDYJCMainURL = 'https://api.m.jd.com/api'
// const JDYJCMainURL = JDConfig.betaEnv ? 'http://beta-api.m.jd.com/api' : 'https://api.m.jd.com/api';
const requestTimeout = 15000;
const secretKey = "02460169765544ce87b4c67fc1d08594"; //签名秘钥
const currentEnv = Taro.getEnv(); // 获取当前环境平台

const CONTENT_TYPE = {
    wwwForm: "application/x-www-form-urlencoded;charset=utf-8",
    applicationJson: "application/json"
};

export default class Request {
    static cookies = "";
    static params = {};
    static getMainURL() {
        return "http://beta-api.m.jd.com/api";
    }

    static get(url, param) {
        return this.getRequest(url, param);
    }

    static post(url, param) {
        return this.postRequest(url, param);
    }

    static getRequest(url, param) {
        const contentType = CONTENT_TYPE.wwwForm;
        const getUrl = this.getURL(url, param, contentType);
        return Taro.request({
            url: getUrl,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": contentType,
                Cookie: this.cookies
            },
            timeout: requestTimeout
        });
    }

    static postRequest(url, param) {
        let contentType = CONTENT_TYPE.wwwForm;

        //获取三级地址，方法为post，请求头特殊处理
        if ("yjc_address_subAddress" === url) {
            contentType = CONTENT_TYPE.wwwForm;
        } else {
            contentType = CONTENT_TYPE.applicationJson;
        }
        const postBody = this.dealPostBody(url, param, contentType);
        const bodyString = this.convertDicToKeyValueString(postBody);
        const requestPara = encodeURI(bodyString);

        return Taro.request({
            url: this.getMainURL(),
            method: "POST",
            data: requestPara,
            header: {
                Accept: "application/json",
                "Content-Type": CONTENT_TYPE.wwwForm,
                Cookie: this.cookies
            },
            timeout: requestTimeout
        });
    }

    /**
     *
     * @param {string} sign 签名字段
     *
     */
    static dealPostBody(url, param, contentType) {
        //0、参数整理为字典类型
        const objc = this.initParam(url, param, contentType);
        //1、参数整理（公参、业务参数）
        const newParams = this.dealWithParam(objc);
        //2、ASCII 顺序拼接签名参数
        const paraAppendString = this.appendSingnParaString(newParams);
        //3、参数签名
        if (currentEnv != "WEB") {
            const hmactring = hmacSha256(paraAppendString, secretKey);
            return Object.assign({}, newParams, { sign: hmactring });
        } else {
            return Object.assign({}, newParams);
        }
    }

    /**
     * 根据公参、参数、接口名 返回URl
     */
    static getURL(functionId, para, contentType) {

        //0、参数整理为字典类型
        const objc = this.initParam(functionId, para, contentType)
        //1、参数整理（公参、业务参数）
        const newParams = this.dealWithParam(objc)
        //2、ASCII 顺序拼接签名参数
        const paraAppendString = this.appendSingnParaString(newParams)
        //3、参数签名
        const hmactring = hmacSha256(paraAppendString, secretKey)
        //4、参数拼接URL链接
        const paramString = this.convertDicToKeyValueString(newParams)
        let urlString = this.getMainURL() + '?' + paramString
        //5、URL链接进行编码
        if (currentEnv != "WEB") {
            urlString = encodeURI(urlString + '&sign=' + hmactring);
        }else{
            urlString = encodeURI(urlString);
        }
        
        return urlString; //返回URL
    }

    static genBody = (para) => {
        const paraNew = {
            // data: para,
            // contentType,
            ...para
        };
        return Object.keys(para).length
            ? { body: JSON.stringify(paraNew) }
            : {};
    };

    static initParam(functionId: string, para, contentType: string) {
        //存放所有的公共参数
        const objc = {
            functionId,
            t: Date.parse(Date()),
            contentType,
            appid: "yjc_app"
        };
        return Object.assign({}, objc, this.genBody(para));
    }

    /**
     * 整理参数（公参、业务参）
     * 返回整理好的字典
     */
    static dealWithParam(objc) {
        //1、参数整理（公参、业务参数）
        const newParams = Object.assign(
            {},
            pick(objc, ["functionId", "t", "appid", "body"])
        );
        return newParams;
    }

    /**
     * 拼接签名前的参数字符串
     * 返回拼接完的字符串
     */
    static appendSingnParaString(newParams) {
        const paraKeyArray = this.mapKeySortASC(newParams);
        return paraKeyArray
            .reduce((total, key) => `${total}&${newParams[key]}`, "")
            .substring(1);
    }

    /**
     *  字典的 key 按照ASCii 排序
     * @param {Object} objc
     * @returns {Array} newkeyArray 返回objc字段数组
     */
    static mapKeySortASC(objc) {
        const newkeyArray = Object.keys(objc).sort();
        return newkeyArray; //返回排好序的新数组
    }

    /**
     * 将网络请求的参数格式转换为键值对字符串格式
     * @param {传入的字典} postBody
     * @return { 返回 字符串 } bodyString
     */
    static convertDicToKeyValueString(postBody) {
        return Object.keys(postBody)
            .reduce(
                (total: string, key) => `${total}&${key}=${postBody[key]}`,
                ""
            )
            .substring(1);
    }

    /**
     *
     *使用XMLHttpRequest实现图片上传
     * @param {string} url 接口地址
     * @param {JSON} params body的请求参数
     * @param {*} progressFunction 进度返回函数
     * @return 返回Promise
     */
    static uploadImage(url, path: any, progressFunction) {
        const commonParams = this.params;
        const allCookies = this.cookies;
        const uploadMediaData = new FormData();
        return new Promise(function(resolve, reject) {
            // file先转换为字符串防止警告
            const file = JSON.stringify({
                uri: path,
                type: "multipart/form-data",
                name: "certUpImg.jpg"
            })
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
            Request.futch(
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

    //具体上传的代码
    static futch(
        url,
        opts: { method: string, headers: any, body: any} = { method: "get", headers: {}, body: {} },
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
}
