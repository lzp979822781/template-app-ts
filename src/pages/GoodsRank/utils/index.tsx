const DEFAULT_BG = 'https://img11.360buyimg.com/imagetools/jfs/t1/140195/31/7995/18951/5f58ac4eE019f959a/dcd004d1aa98f66f.png';
const getRemainder = (param, bits = 2, padStr = '0') => {
    if(typeof param !== 'number') return '';
    const isInterger = (param | 0) === param;
    if(isInterger) return '';
    return `${param}`.split('.')[1].padEnd(bits, padStr);
}

// eslint-disable-next-line import/prefer-default-export
export { DEFAULT_BG, getRemainder };