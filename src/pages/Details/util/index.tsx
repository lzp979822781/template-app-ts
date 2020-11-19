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

function handleDetailAmout(amount) {
    if(typeof amount !== "number" ) return '--';
    const absVal = Math.abs(amount);
    return `${amount > 0 ? '+' : '-'}${handleAmout(absVal)}`
}

/**
 * 将日期格式 2020.10.20 替换为2020-10-20
 * @param {*} str
 * @returns
 */
function replaceDot(str) {
    return str ? str.replace(/\./g, '-') : str;
}

const DEFAULT_BG = 'https://img11.360buyimg.com/imagetools/jfs/t1/140195/31/7995/18951/5f58ac4eE019f959a/dcd004d1aa98f66f.png';


// eslint-disable-next-line import/prefer-default-export
export { 
    handleAmout, replaceDot, handleDetailAmout,
    DEFAULT_BG
};