import Taro from '@tarojs/taro';

/**
 * 金额展示补充小数点后面的位数
 * @param {*} amount
 * @returns
 */
function handleAmout(amount) {
    if(typeof amount !== "number" && !amount) return '0.00';
    const [start, end = '0'] = `${amount}`.split('.');
    const endStr = end.length > 2 ? end.substr(0, 2) : end.padEnd(2, '0');
    return `${start}.${endStr}`;
}

/**
 * 将日期格式 2020.10.20 替换为2020-10-20
 * @param {*} str
 * @returns
 */
function replaceDot(str) {
    return str ? str.replace(/\./g, '-') : str;
}

const DEFAULT_BG = 'https://img13.360buyimg.com/imagetools/jfs/t1/152803/38/3518/226152/5f9511faE038ad77b/14766f54f6d4610a.png';


// eslint-disable-next-line import/prefer-default-export
export { 
    handleAmout, replaceDot,
    DEFAULT_BG
};