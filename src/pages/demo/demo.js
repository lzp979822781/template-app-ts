import util from '../login/util.js'

const plugin = requirePlugin("loginPlugin");
Page({
  toLogin(){
    const returnPage='/pages/demo/demo';
    wx.navigateTo({ url:`/pages/login/index/index?returnPage=${returnPage}` })
  },
  logout(){
    plugin.logout().then(res => { console.jdLoginLog(res,'logoutres')}) 
  },
  toh5(){
    //小程序中已有登录态，可直接使用下列方法实现h5登录态打通
    util.redirectToH5({ page: 'm.jd.com' })
  },
  //登录成功获取pt_key， 没登录弹出空
  getPtKey(){
    const k = plugin.getPtKey()
    wx.showModal({
      title: k,
      content: '',
    })
  },
  //登录成功获取pt_pin， 没登录或没有pt_pin弹出空
  getPtPin(){
    const p = plugin.getPtPin()
    wx.showModal({
      title: p,
      content: '',
    })   
  },
  //两个小程序登录态打通步骤1,登录态换toekn,需确保已登录
  gentoken(){
    util.h5Init(); //直接调用需存储登录参数，如已走过登录流程则无需调用该方法
    plugin.getLoginToken().then((res={})=>{
      this.setData({ token: res.token_key || '' })
    })

  },
  //两个小程序登录态打通步骤2, toekn换登录态
  transferTokenToLogin(){
    util.h5Init(); //直接调用需存储登录参数，如已走过登录流程则无需调用该方法
    plugin.transferTokenToLogin({
      tokenkey: this.data.token
    }).then((res={})=>{
      //err_code 0 换取登录态成功
      console.log(res) 
    });
  },
  //封装请求，Cookie中携带登录信息pt_key, pt_pin, guid, pt_token
  requestWithLoginStatus() {
    util.requestWithLoginStatus({
      url: 'https://beta-wxapplogin.m.jd.com/cgi-bin/v2/logout',
      method:'POST',
      data: {
        wxappid: 'wxefe655223916819e',
        pappid: 'wxefe655223916819e',
        appid: 269,
        client_ver: '1.1.8'
      }
    })
  },
  //封装请求，获取混淆pin后的token
  getISVToken() {
    plugin.isvObfuscator().then(res=>{
      const { token, message } = res;
      wx.showModal({
        title: token?'token获取成功':`token获取失败:${message}`,
        content: token,
      })
    }).catch(err=>{
      console.log('err',err)
    })
  }
})