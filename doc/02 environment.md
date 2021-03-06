# ios环境

## homebrew安装

在终端中运行

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## cocoapods安装

```
sudo gem install cocoapods -v 1.8.4  // 或者brew install cocoapods -v 1.8.4
// 如果没有
pod repo add master https://coding.jd.com/jd/CocoapodsSpec.git
注意：不要更改默认的xcode名称和路径,如果有多xcode版本安装，请指定到默认, 更改方式如下，如果
使用命令sudo xcode-select --switch /Applications/Xcode.app 后面为自己的xcode地址
通过xcode修改：打开xcode -> xcode -> preferences -> locations -> Command Line Toolsx下修改路径，当前命令行工具路径见下面的灰色字体
```



## React-native-cli安装

```
npm install -g react-native-cli
```

## taro cli 安装

如果以前安装过其他版本的taro cli版本，请先卸载！Taro的版本有严格的对应关系。当前工程中使用的是2.0.3版本

```
npm i @tarojs/cli@2.0.3 -g
```



## RN环境验证

### 下载ts工程和壳工程

ts工程：进入git.jd.com 下载template-app-ts  分支为 dev

壳工程: taro-native-shell工程在git.jd.com中   分支为 dev 默认启动应用templateAppJs

### ts工程包安装

执行 npm i 或者yarn 

### 壳工程包安装

```
npm i   // 或者yarn
cd ios
pod install
```

### 启动验证

启动ts工程：进入template-app-ts目录,

```
// rn启动环境验证
npm run dev:rn
```

启动壳工程：进入taro-native-shell目录，运行

```
 react-native run-ios
```

## 微信小程序

### 下载微信开发者工具

下载链接：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

### 小程序账号注册

注册链接：https://mp.weixin.qq.com/wxopen/waregister?action=step1

### 启动taro 微信小程序

进入template-app-ts目录，执行npm run dev:weapp，此时在dist目录下生产成本weapp工程

### 微信开发者工具工程导入

将dist/weapp工程导入到微信开发者工具

## 其余端验证

按照官网启动命令进行启动，无需特别注意

