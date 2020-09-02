import Taro from "@tarojs/taro";

export default class Toast {
    static show = txt => {
        Taro.showToast({
            title: txt,
            icon: "none",
            duration: 2000
        });
    };
    static hide = () => {
        Taro.hideToast();
    };
}
