import Taro from '@tarojs/taro';
import pick from 'lodash/pick';
import omit from 'lodash/omit';

interface MainParam {
    urlParam?: object;
    data?: object;
    header?: object;
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

function getUrl(param: UrlParam) {
    const { url, urlParam } = param;
    return Object.keys(urlParam).reduce((total, key, index) => `${total}${index ? '&' : ''}${key}=${urlParam[key]}`, `${BASEURL}${url}?`);
}

function tranformParam(param: MainParam, type) {
    const url = getUrl(pick(param, ['url', 'urlParam']));
    const otherParam = omit(param, ['url', 'urlParam']);
    return Object.assign({}, type ==='get' ? DEFAULT_GET : DEFAULT_POST, { url }, otherParam);
}

/**
 *
 * @param {object} mainParam
 * @param {*} otherParam
 */
function get(param: MainParam) {
    const normalParam = tranformParam(param, 'get');
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