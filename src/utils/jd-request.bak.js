import Taro from "@tarojs/taro";
import {
  JDNetwork,
  // JDJumping
} from "@jdreact/jdreact-core-lib";

let timer = null;

const Observer = (function () {
  const handle = [];

  return {
    on(functionId, disable) {
      const index = handle.indexOf(functionId);
      if (index < 0) {
        handle.push(functionId);
      }else{
        return true;
      };
      if (handle.length == 1 && !disable) {
        Taro.showLoading({
          title: "加载中"
        });
      };
    },

    off(functionId, disable) {
      const index = handle.indexOf(functionId);
      if (index > -1) {
        handle.splice(index, 1)
      };
      if (handle.length == 0 && !disable) {
        Taro.hideLoading();
      };
    }
  }
})();

export default class JDRequest {
  static timeoutFetch = (originalFetch, functionId, disable, timeout = 30000) => {

    const timeoutPromise = new Promise((resolve, reject) => {
      if (timer) {
        clearTimeout(timer);
      };

      timer = setTimeout(() => {
        resolve({ timeout: 1, errorMsg: "请求超时" });
      }, timeout);
    });

    // Promise.race(iterable)方法返回一个promise
    // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
    const abortablePromise = Promise.race([originalFetch, timeoutPromise])

    abortablePromise.then(function (params) {
      Observer.off(functionId, disable);
    });

    return abortablePromise;
  };

  static get(functionId, param = null, disable) {
    const hasFunctionId = Observer.on(functionId);
    //防止重复请求
    if(hasFunctionId){
      return;
    };
    const newParam = this.formatParam(param);
    return this.timeoutFetch(JDNetwork.fetchWithoutHost(functionId, newParam, "get"), functionId, disable);
  }

  static post(functionId, param = null, disable) {
    const hasFunctionId = Observer.on(functionId);
    //防止重复请求
    if(hasFunctionId){
      return;
    };
    const newParam = this.formatParam(param);
    return this.timeoutFetch(JDNetwork.fetchWithoutHost(functionId, newParam, "post"), functionId, disable);
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
  };
}
