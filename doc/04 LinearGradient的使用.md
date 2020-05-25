# Linear-gradient使用

因为RN端本身不支持css中的linear-gradient的使用,所以这里通过第三方包expo-linear-gradient， 使用expo的包而不使用react-native-linear-gradient包是因为，当前ios的原生包默认加载react-native-unimodules包，这个包已经集成到jdreact的壳中，react-native-unimodules是expo的核心包，后续我们添加expo的包的时候就不需要在Podfile添加也不需要重新修改jdreact和taro的融合壳

# expo-linear-gradient的配置

## taro-native-shell修改

### 添加expo-linear-gradient包

运行如下命令添加

```
npm i expo-linear-gradient@^6.0.0
```

说明：这是只是对添加通用expo包的说明，当前的expo-linear-gradient包已添加到原生壳中

### ios目录下安装

添加完npm包需要在taro-native-shell/ios 目录下执行如下命令

```
pod install 
```

添加ios的依赖(<span style='color:red'>如果ios目录下有Podfile.lock文件，先进行删除</span>）

## template-app-ts工程中添加包

在template-app-ts中安装expo-linear-gradient,执行如下命令

```
npm i expo-linear-gradient@^6.0.0
```

## 重启服务

### 重启template-app-ts工程

停止Metro bundler终端(<span style='color:red'>运行npm run dev:rn后启动的终端</span>)，重新运行npm run dev:rn命令

### 重新安装壳

在taro-native-shell目录下重新运行如下命令

```
react-native run-ios
```

# 使用示例

```
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { LinearGradient } from 'expo-linear-gradient';

class Test extends Component {
    render() {
        return (
            <View>
                <LinearGradient
                    colors={['red', '#3b5998', '#192f6a']}
                    style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}
                >
                    <Text
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: 15,
                            color: '#fff',
                        }}
                    >
                        Sign in with Facebook
                    </Text>
                </LinearGradient>
            </View>
        )
    }
}

export default Test;
```

