import Taro, { requirePlugin } from '@tarojs/taro';
import pick from 'lodash/pick';
import omit from 'lodash/omit';

const isWeapp = Taro.getEnv().toLowerCase() === 'weapp';
const plugin = isWeapp && requirePlugin("loginPlugin");

interface MainParam {
    urlParam?: object;
    data?: object;
    header?: any;
    url: string;
    returnPage?: string;
}

interface UrlParam {
    appid?: string;
    functionId?: string;
    url: string;
    [key: string ]: any;
}

const BASEURL = '';

const DEFAULT_PARAM = {
    credentials: "include",
    mode: "cors",
};

const DEFAULT_GET = { ...DEFAULT_PARAM, method: 'GET'};
const DEFAULT_POST = { ...DEFAULT_PARAM, method: 'POST'};

function handleNoLogin(response: any, reqParam) {
    const { returnPage } = reqParam;
    const { data: { code = '', data: { systemUserStatusEnum = '' } = { }, success = false} = {} } = response;
    if(success && (code === 999 || systemUserStatusEnum === 'NO_LOGIN')) {
        Taro.navigateTo({
            url: `/pages/login/index/index?returnPage=${returnPage || '/pages/home/Home/index' }`
        })
    } else {
        return response;
    }
}

/**
 * 按照color网关 h5接口的参数生成cookie
 * @pt_key
 * @pt_pin 对PIN进行encode编码
 */
function getCookie(cookie) {
    // return ' pt_pin=%E6%B5%8B%E8%AF%95jijinye;pt_key=AAJfO5xpADA6zaKsdVVqtHO-DCCChqE-Ze7D7Rg3ZwTGU0uMS_-Y4vjNjZ2sh-3ApsDOqRFZchA';
    if(!plugin) return cookie;
    const [GUID = '', KEY = '', TOKEN = '', PIN = ''] = plugin.getJdListStorage(['guid', 'pt_key', 'pt_token', 'pt_pin']);
    const _cookie = `guid=${GUID};pt_pin=${encodeURIComponent(PIN)};pt_key=${KEY};pt_token=${TOKEN}`

    return cookie ? `${cookie};${_cookie}` :`${_cookie}`;
} 

/**
 * 拼接url参数
 * @param {UrlParam} param urlParam为request url参数数据字段
 * @returns
 */
function getUrl(param: UrlParam) {
    const { url, urlParam = {} } = param;
    const comParam = {
        client: 'm'
    }
    const allUrlParam = { ...urlParam, t: new Date().getTime(), ...comParam }
    return Object.keys(allUrlParam).reduce((total, key, index) => `${total}${index ? '&' : ''}${key}=${allUrlParam[key]}`, `${BASEURL}${url}?`);
}

function tranformParam(param: MainParam, type) {
    const { header: { cookie = '', ...otherHeader } = {}, } = param;
    const url = getUrl(pick(param, ['url', 'urlParam']));
    const otherParam = omit(param, ['url', 'urlParam', 'header']);

    // 重新拼接
    const newHeader = {
        header: {
            ...otherHeader,
            cookie: getCookie(cookie)
        }
        
    };

    return Object.assign({}, type ==='get' ? DEFAULT_GET : DEFAULT_POST, { url }, otherParam, newHeader );
}


function doRequest(param) {
    return Taro.request(param)
        .then(data => {
            console.log("data", data);
            return handleNoLogin(data, param);
        }).catch(e => {
        console.log("error", e);
    })
}
  

/**
 *
 * @param {object} mainParam
 * @param {*} otherParam
 */
function get(param: MainParam) {
    const normalParam = tranformParam(param, 'get');
    console.log("normalParam", normalParam);
    return doRequest(normalParam);
}

function post(param: MainParam) {
    const normalParam = tranformParam(param, 'post');
    return doRequest(normalParam);
}




export { get, post };