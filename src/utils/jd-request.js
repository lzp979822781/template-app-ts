import {
  JDNetwork,
  JDJumping
} from "@jdreact/jdreact-core-lib";

import { Toast } from "./model";

export default class JDRequest {

  static timeoutFetch = (originalFetch, timeout = 30000) => {
    let timeoutBlock = () => {};
    const timeoutPromise = new Promise((resolve, reject) => {
      timeoutBlock = () => {
        // 请求超时处理
        reject("请求超时");
      };
    });

    // Promise.race(iterable)方法返回一个promise
    // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
    const abortablePromise = Promise.race([originalFetch, timeoutPromise]);

    setTimeout(() => {
      timeoutBlock();
    }, timeout);

    return abortablePromise;
  };

  static get(functionId, param=null) {
    return this.timeoutFetch(JDNetwork.fetchWithoutHost(functionId, param, "get"));
  }

  static post(functionId, param=null) {
    return this.timeoutFetch(JDNetwork.fetchWithoutHost(functionId, param, "post"));
  }

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