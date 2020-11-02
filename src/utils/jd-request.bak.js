import Taro from "@tarojs/taro";
import {
  JDNetwork,
  // JDJumping
} from "@jdreact/jdreact-core-lib";
import { Loading, Toast } from "@/utils/model";

let timer = null;

// function delay(fn, wait) {                 
//       setTimeout(fn, wait);
// };

const Observer = (function () {
  const handle = [];
  let errorMsgList = [];
  return {
    on(functionId, disable) {
      const index = handle.indexOf(functionId);

      //防止触发重复未完成的请求
      if (index < 0) {
        handle.push(functionId);
      } else {
        return true;
      };

      //第一个且能用loading的触发加载弹框
      if (handle.length == 1 && !disable) {
        errorMsgList = [];
        Loading.show()
      };
    },

    off(functionId, disable, res) {
      const index = handle.indexOf(functionId);
      
      if(res && !res.success){
        errorMsgList.push(res.errorMsg);
      };

      if (index > -1) {
        handle.splice(index, 1);
      };

      //最后一个请求完成后关闭
      if (handle.length == 0 && !disable) {
        Loading.hide();
        if(errorMsgList && errorMsgList.length>0){
          errorMsgList = errorMsgList.filter(function(item){
              return !!item;
          });
          Toast.show(errorMsgList.join())
        };
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

    abortablePromise.then(function (res) {
      Observer.off(functionId, disable, res);
    }, function (err) {
      Observer.off(functionId, disable, err);
    });

    return abortablePromise;
  };

  static get(functionId, param = null, disable) {
    const hasFunctionId = Observer.on(functionId);
    //防止重复请求
    if (hasFunctionId) {
      return;
    };
    const newParam = this.formatParam(param);
    return this.timeoutFetch(JDNetwork.fetchWithoutHost(functionId, newParam, "get"), functionId, disable);
  }

  static post(functionId, param = null, disable) {
    const hasFunctionId = Observer.on(functionId);
    //防止重复请求
    if (hasFunctionId) {
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
