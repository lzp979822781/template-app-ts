const config = {
    appid: 1251,
    returnPage: undefined,
    pageType: undefined,
    isLogout: undefined, 
    noWXinfo: undefined,
    h5path: undefined,
    logoPath: undefined,
    isTest: undefined, //1 预发接口，改为undefined 调用线上接口
    isKepler: undefined,
    navigationBarColor: undefined,
    navigationBarTitle: undefined,
    tabNum: 2,
    requestHost:'https://wxapplogin.m.jd.com',
    selfTips: [{
        tip: '《京东用户注册协议》',
        url: 'https://wxapplogin.m.jd.com/static/registration.html'
    }, {
        tip: '《京东隐私政策》',
        url: 'https://wxapplogin.m.jd.com/static/private.html'
    }]
}

export default config;