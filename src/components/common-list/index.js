import Taro from "@tarojs/taro";

const currentEnv = Taro.getEnv(); // 获取当前环境平台

if (currentEnv === "RN") {
    module.exports = require("./common-list-rn").default;
} else {
    module.exports = require("./common-list").default;
}
