async function isLogin() {
    return new Promise(resolve => {
        resolve('微信端是否登录');
    })
}

async function callLogin() {
    return new Promise((resolve) => {
        resolve('微信登录');
    }).catch(e => {
        console.log("登录错误", e);
    })
}

export { callLogin, isLogin };