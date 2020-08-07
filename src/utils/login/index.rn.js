import { NativeModules } from 'react-native';
import Taro from '@tarojs/taro-rn';

const JDMReactNativeModule = NativeModules.JDMReactNativeModule;

async function isLogin() {
    return new Promise((resolve) => {
        JDMReactNativeModule.checkLoginState(function(res) {
            resolve(res)
        });
    })
    
}

async function callLogin() {
    return new Promise((resolve) => {
        JDMReactNativeModule.getA2((res) => {
            resolve(res);
        })
    }).catch(e => {
        console.log("error", e);
    })
}

export { isLogin, callLogin };
