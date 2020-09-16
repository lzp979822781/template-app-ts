import Taro from "@tarojs/taro";
import {
  JDNetwork,
  // JDJumping
} from "@jdreact/jdreact-core-lib";

let timer = null;
export default class JDRequest {
  static timer = null;
  static timeoutFetch = (originalFetch, timeout = 15000) => {
    
    const timeoutPromise = new Promise((resolve, reject) => {
      if(timer){
        clearTimeout(timer);
      };
      
      timer = setTimeout(() => {
        // Taro.showToast({
        //   title: "请求超时",
        //   icon: 'none',
        //   duration: 1000
        // });
        resolve({timeout:1, errorMsg: "请求超时"});
      }, timeout);
    });

    // Promise.race(iterable)方法返回一个promise
    // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
    const abortablePromise = Promise.race([originalFetch, timeoutPromise]);

    return abortablePromise;
  };

  static get(functionId, param = null) {
    const newParam = this.formatParam(param);
    return this.timeoutFetch(JDNetwork.fetchWithoutHost(functionId, newParam, "get"));
  }

  static post(functionId, param = null) {
    const newParam = this.formatParam(param);
    return this.timeoutFetch(JDNetwork.fetchWithoutHost(functionId, newParam, "post"));
  }

  static formatParam(param) {
    let newParam = null;
    if (
      JSON.stringify(param) === "{}" ||
      !param
    ) {
      newParam = null;
    } else {
      newParam = {
        ...param,
      };
      newParam = JSON.stringify(newParam);
    }

    return newParam;
  }

  // static logout = () => {
  //   JDJumping.jumpToOpenapp(
  //     `openApp.jyingApp://virtual?params={"category":"jump","des":"logoutJumpToLoginPage"}`
  //   )
  //     .then(() => { })
  //     .catch(error => {
  //       Toast.show(error.message);
  //     });
  // };
}
