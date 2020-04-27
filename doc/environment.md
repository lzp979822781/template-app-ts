# ios环境

## homebrew安装

在终端中运行

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## cocoapods安装

```
sudo gem install cocoapods -v 1.8.4  // 或者brew install cocoapods -v 1.8.4
执行pod setup查看是否有master目录，没有的话继续执行下面命令
pod repo add master https://coding.jd.com/jd/CocoapodsSpec.git
注意：不要更改默认的xcode名称和路径,如果有多xcode版本安装，请指定到默认
使用命令sudo xcode-select --switch /Applications/Xcode.app 后面为自己的xcode地址
通过xcode修改：打开xcode -> xcode -> preferences -> locations -> Command Line Toolsx下面的灰色字体中修改
```



## React-native-cli安装

```
npm install -g react-native-cli
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

## 其余端验证

按照官网启动命令进行启动，无需特别注意

