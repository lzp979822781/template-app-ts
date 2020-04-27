import hmacSHA512 from "crypto-js/hmac-sha512";
import Taro, { Component, Config } from "@tarojs/taro";

// const host = 'https://yaoser.jd.com/';
// const JDYJCMainURL = 'https://api.m.jd.com/api'
// const JDYJCMainURL = JDConfig.betaEnv ? 'http://beta-api.m.jd.com/api' : 'https://api.m.jd.com/api';
const requestTimeout = 15000;
const secretKey = "02460169765544ce87b4c67fc1d08594"; //签名秘钥

let CONTENT_TYPE = {
    FORM_WWW: "application/x-www-form-urlencoded;charset=utf-8",
    JSON_Type: "application/json"
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

    static post(url, param, callback) {
        this.postRequest(url, param, callback);
    }

    static getRequest(url, param) {
        let contentType = CONTENT_TYPE.FORM_WWW;
        let getUrl = this.getURL(url, param, contentType);
        let config = {
            headers: {
                Accept: "application/json",
                "Content-Type": contentType,
                Cookie: this.cookies
            },
            timeout: requestTimeout
        };

        return Taro.request({
            url: getUrl,
            method: "GET",
            header: config.headers
        });
    }

    static postRequest(url, param, callback) {
        let contentType = CONTENT_TYPE.FORM_WWW;
        if ("yjc_address_subAddress" === url) {
            contentType = CONTENT_TYPE.FORM_WWW;
        } else {
            contentType = CONTENT_TYPE.JSON_Type;
        }
        let postBody = this.dealPostBody(url, param, contentType);
        let bodyString = this.convertDicToKeyValueString(postBody);
        let requestPara = encodeURI(bodyString);

        let config = {
            headers: {
                Accept: "application/json",
                "Content-Type": CONTENT_TYPE.FORM_WWW,
                Cookie: this.cookies
            },
            timeout: requestTimeout
        };

        return Taro.request({
            url: this.getMainURL(),
            method: "POST",
            data: requestPara,
            header: config.headers,
            success: function(res) {
                if (callback) {
                    callback(resp.data, null);
                }
                callback = null;
            }
        });
    }

    static dealPostBody(url, param, contentType) {
        //0、参数整理为字典类型
        let objc = this.initParam(url, param, contentType);
        //1、参数整理（公参、业务参数）
        let newParams = this.dealWithParam(objc, param);
        //2、ASCII 顺序拼接签名参数
        let paraAppendString = this.appendSingnParaString(newParams);
        //3、参数签名
        let hmactring = hmacSha256(paraAppendString, secretKey);
        //4、参数中加入签名字段
        newParams["sign"] = hmactring;

        return newParams;
    }

    /**
     * 根据公参、参数、接口名 返回URl
     */
    static getURL(functionId, para, contentType) {
        //0、参数整理为字典类型
        let objc = this.initParam(functionId, para, contentType);
        //1、参数整理（公参、业务参数）
        let newParams = this.dealWithParam(objc, para);
        //2、ASCII 顺序拼接签名参数
        let paraAppendString = this.appendSingnParaString(newParams);
        //3、参数签名
        let hmactring = hmacSHA512(paraAppendString, secretKey);

        //4、参数拼接URL链接
        let paramString = this.convertDicToKeyValueString(newParams);
        let urlString = this.getMainURL() + "?" + paramString;
        //5、URL链接进行编码
        urlString = encodeURI(urlString + "&sign=" + hmactring);
        return urlString; //返回URL
    }

    static initParam(functionId, para, contentType) {
        var params = this.params; //获取url中"?"符后的字串
        //存放所有的公共参数
        var objc = new Object();
        // var str = params.substr(1); //从第一个字符开始截取
        // strs = str.split("&"); //以&符号分离
        // for (var i = 0; i < strs.length; i++) {
        //     objc[strs[i].split("=")[0]] = strs[i].split("=")[1];
        // }
        objc["functionId"] = functionId;
        objc["t"] = Date.parse(Date());
        if (Object.keys(para).length) {
            let paraNew = {
                data: para,
                contentType: contentType
            };
            objc["body"] = JSON.stringify(paraNew);
        }
        objc["contentType"] = contentType;
        objc["appid"] = "yjc_app";
        return objc;
    }

    /**
     * 整理参数（公参、业务参）
     * 返回整理好的字典
     */
    static dealWithParam(objc, para) {
        //1、参数整理（公参、业务参数）
        let newParams = {};
        newParams["functionId"] = objc["functionId"];
        newParams["t"] = objc["t"];
        if (Object.keys(para).length) {
            newParams["body"] = objc["body"];
        }
        // newParams["contentType"] = objc["contentType"];
        newParams["appid"] = objc["appid"];
        // newParams["uuid"] = objc["uuid"];
        // newParams["client"] = objc["clientType"];
        // newParams["clientVersion"] = objc["clientVersion"];
        // newParams["build"] = objc["vb"];
        // newParams["osVersion"] = objc["osVersion"];
        // newParams["networkType"] = objc["networkType"];
        // newParams["d_brand"] = objc["b"];
        // newParams["d_model"] = objc["model"];
        return newParams;
    }

    /**
     * 拼接签名前的参数字符串
     * 返回拼接完的字符串
     */
    static appendSingnParaString(newParams) {
        let paraKeyArray = this.mapKeySortASC(newParams);
        let hmacSha256String = "";
        for (let index = 0; index < paraKeyArray.length; index++) {
            const element = paraKeyArray[index];
            if (index == 0) {
                hmacSha256String += newParams[element];
            } else {
                hmacSha256String += "&" + newParams[element];
            }
        }
        return hmacSha256String;
    }

    /**
     *  字典的 key 按照ASCii 排序
     * @param {字典} map
     */
    static mapKeySortASC(objc) {
        var newkeyArray = Object.keys(objc).sort();
        return newkeyArray; //返回排好序的新对象
    }

    /**
     * 将网络请求的参数格式转换为键值对字符串格式
     * @param {传入的字典} postBody
     * @return { 返回 字符串 } bodyString
     */
    static convertDicToKeyValueString(postBody) {
        //body字符串变量
        let bodyString = "";
        //拼接符号
        var mark = "";
        var i = 0;
        for (key in postBody) {
            if (i > 0) {
                mark = "&";
            }
            var value = postBody[key];
            var paramStr = mark + key + "=" + value;
            bodyString += paramStr;
            i++;
        }
        return bodyString;
    }

    /**
     *
     *使用XMLHttpRequest实现图片上传
     * @param {string} url 接口地址
     * @param {JSON} params body的请求参数
     * @param {*} progressFunction 进度返回函数
     * @return 返回Promise
     */
    static uploadImage(url, path, progressFunction) {
        let commonParams = this.params;
        let allCookies = this.cookies;
        const uploadMediaData = new FormData();
        return new Promise(function(resolve, reject) {
            uploadMediaData.append("file", {
                uri: path,
                type: "multipart/form-data",
                name: "certUpImg.jpg"
            });
            var host = "http://yaoser.jd.com";
            var reqUrl = host + url + "?" + commonParams;
            // 上传成功
            successResponse = xhr => {
                //这个key 就是你上传文件在oss 的地址了，
                if (xhr._response) {
                    let res = new Function("return " + xhr._response)();
                    if (res) {
                        resolve(res);
                    }
                }
            };
            //上传失败
            failResponse = xhr => {
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
    static futch(url, opts = {}, onProgress, successResponse, failResponse) {
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open(opts.method || "get", url);
            for (let k in opts.headers || {}) {
                xhr.setRequestHeader(k, opts.headers[k]);
            }
            xhr.onreadystatechange = e => {
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
