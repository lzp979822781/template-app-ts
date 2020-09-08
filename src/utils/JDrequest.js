import {
  JDNetwork,
  JDJumping
} from "@jdreact/jdreact-core-lib";
import { Loading, Toast } from "./model";
export default class JDRequest {
  static defaultOption = {
    url: "",
    param: {},
    loadingCallBack: () => {},
    callBackSuccess: (response) => {
      Loading.hide();
    },
    callBackWarn: (response) => {
      Loading.hide();
      if (response && response.errorMsg) {
        Toast.show(response.errorMsg);
      }
    },
    callBackError: (error) => {
      if (error && error.message) {
        Toast.show(error.message);
      } else {
        Toast.show("网络错误");
      }
    },
  };

  static timeoutFetch = (originalFetch, timeout = 30000) => {
    let timeoutBlock = () => {};
    let timeoutPromise = new Promise((resolve, reject) => {
      timeoutBlock = () => {
        // 请求超时处理
        reject("请求超时");
      };
    });

    // Promise.race(iterable)方法返回一个promise
    // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
    let abortablePromise = Promise.race([originalFetch, timeoutPromise]);

    setTimeout(() => {
      timeoutBlock();
    }, timeout);

    return abortablePromise;
  };

  static get(options) {
    let extendOptions = {
      ...this.defaultOption,
      ...options,
    };

    extendOptions.loadingCallBack();

    let param = null;
    if (
      JSON.stringify(extendOptions.param) === "{}" ||
      extendOptions.param === "" ||
      extendOptions.param === undefined
    ) {
      param = null;
    } else {
      param = {
        ...extendOptions.param,
      };
      param = JSON.stringify(param);
    }

    this.timeoutFetch(JDNetwork.fetchWithoutHost(options.url, param, "get"))
      .then((response) => {
        if (response.code === 5005) {
          this.logout();
        }
        this.printLog(extendOptions.url, param, response);
        if (response && response.success) {
          extendOptions.callBackSuccess(response);
        } else {
          extendOptions.callBackWarn(response);
        }
      })
      .catch((error) => {
        this.printLog(extendOptions.url, param, error);
        extendOptions.callBackError(error);
      });
  }

  static post(options) {
    let extendOptions = {
      ...this.defaultOption,
      ...options,
    };

    extendOptions.loadingCallBack();

    let param = null;
    if (
      JSON.stringify(extendOptions.param) === "{}" ||
      extendOptions.param === "" ||
      extendOptions.param === undefined
    ) {
      param = null;
    } else {
      param = {
        ...extendOptions.param,
      };
      param = JSON.stringify(param);
    }
    this.timeoutFetch(JDNetwork.fetchWithoutHost(options.url, param, "post"))
      .then((response) => {
        if (response.code === 5005) {
          this.logout();
        }
        this.printLog(extendOptions.url, param, response);
        if (response && response.success) {
          extendOptions.callBackSuccess(response);
        } else {
          extendOptions.callBackWarn(response);
        }
      })
      .catch((error) => {
        this.printLog(extendOptions.url, param, error);
        extendOptions.callBackError(error);
      });
  }
  static printLog = (url, param, response) => {
    if (__DEV__) {
      console.log(`--接口start: ${url}--`);
      console.log(param);
      console.log(response);
      console.log(`--接口end`);
    }
  };

  static logout = () => {
    JDJumping.jumpToOpenapp(
      `openApp.jyingApp://virtual?params={"category":"jump","des":"logoutJumpToLoginPage"}`
    )
      .then(() => {})
      .catch(error => {
        Toast.show(error.message);
      });
  };
}
