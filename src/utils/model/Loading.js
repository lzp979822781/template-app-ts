import Taro from "@tarojs/taro";

export default class Loading {
    static show = () => {
        Taro.showLoading({
            title: "加载中..."
        });
    };

    static hide = () => {
        Taro.hideLoading();
    };
}
