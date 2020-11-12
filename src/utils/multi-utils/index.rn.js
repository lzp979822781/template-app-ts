import { NativeModules } from "react-native";

// 通过原生方法获取tabbar高度
async function getTabbarHeight() {
    return new Promise((resolve) => {
        NativeModules.JYNativeModule.getTabbarHeight(tabbarHeight => {
            resolve(tabbarHeight);
        })
    }).catch(err => {
        console.log("react native获取原生tabbar高度发生异常", err);
    })
}

// eslint-disable-next-line import/prefer-default-export
export { getTabbarHeight };

// 展示隐藏tabbar
function showTabbar() {
    NativeModules.JYNativeModule.hideTabbar(false);
}

function hideTabbar() {
    NativeModules.JYNativeModule.hideTabbar(true);
}

export { showTabbar, hideTabbar };


