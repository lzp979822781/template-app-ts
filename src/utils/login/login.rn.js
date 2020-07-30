import { NativeModules } from 'react-native';
import Taro from '@tarojs/taro-rn';

var JDMReactNativeModule = NativeModules.JDMReactNativeModule;

async function isLogin() {
    return new Promise((resolve, reject) => {
        JDMReactNativeModule.checkLoginState(function(res) {
            resolve(res)
        });
    })
    
}

export { isLogin };
