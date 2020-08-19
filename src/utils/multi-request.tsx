import Taro from '@tarojs/taro';
import pick from 'lodash/pick';
import omit from 'lodash/omit';

const isWeapp = Taro.getEnv().toLowerCase() === 'weapp';
const plugin = isWeapp && requirePlugin("loginPlugin");

interface MainParam {
    urlParam?: object;
    data?: object;
    header?: any;
    url: string;
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

/**
 * 按照color网关 h5接口的参数生成cookie
 * @pt_key
 *
 */
function getCookie(cookie) {
    return ' pt_pin=%E6%B5%8B%E8%AF%95jijinye;pt_key=AAJfO5xpADA6zaKsdVVqtHO-DCCChqE-Ze7D7Rg3ZwTGU0uMS_-Y4vjNjZ2sh-3ApsDOqRFZchA';
    if(!plugin) return cookie;
    const [GUID = '', KEY = '', TOKEN = '', PIN = ''] = plugin.getJdListStorage(['guid', 'pt_key', 'pt_token', 'pt_pin']);
    const _cookie = `guid=${GUID};pt_pin=${encodeURIComponent(PIN)};pt_key=${KEY};pt_token=${TOKEN}`

    return cookie ? `${cookie};${_cookie}` :`${_cookie}`;
} 

function getUrl(param: UrlParam) {
    const { url, urlParam = {} } = param;
    const allUrlParam = { ...urlParam, t: new Date().getTime(), clientType: 'm' }
    return Object.keys(allUrlParam).reduce((total, key, index) => `${total}${index ? '&' : ''}${key}=${allUrlParam[key]}`, `${BASEURL}${url}?`);
}

function tranformParam(param: MainParam, type) {
    const { header: { cookie = '', ...otherHeader } = {}, } = param;
    const url = getUrl(pick(param, ['url', 'urlParam']));
    const otherParam = omit(param, ['url', 'urlParam', 'header']);
    const newHeader = {
        header: {
            ...otherHeader,
            cookie: getCookie(cookie)
        }
        
    };

    const body = {
        body: '{ clientType: "m"}'
    }
    return Object.assign({}, type ==='get' ? DEFAULT_GET : DEFAULT_POST, { url }, otherParam, newHeader, body );
}


  

/**
 *
 * @param {object} mainParam
 * @param {*} otherParam
 */
function get(param: MainParam) {
    const normalParam = tranformParam(param, 'get');
    console.log("normalParam", normalParam);
    return Taro.request(normalParam).catch(e => {
        console.log("error", e);
    })
}

function post(param: MainParam) {
    const normalParam = tranformParam(param, 'post');
    console.log("normalParam", normalParam);
    return Taro.request(normalParam).catch(e => {
        console.log("error", e);
    })
}


export { get, post };