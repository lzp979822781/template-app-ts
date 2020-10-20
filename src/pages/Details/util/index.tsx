import Taro from '@tarojs/taro';

/**
 * 金额展示补充小数点后面的位数
 * @param {*} amount
 * @returns
 */
function hanldeAmout(amount) {
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

function showLoading(text = '加载中') {
    Taro.showLoading({
        title: text,
    })
}

function hideLoading() {
    Taro.hideLoading();
}


// eslint-disable-next-line import/prefer-default-export
export { 
    hanldeAmout, replaceDot,
    showLoading, hideLoading
};