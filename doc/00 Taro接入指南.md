# jdreact工程准备

## jdreact工程申请

申请地址：https://cf.jd.com/pages/viewpage.action?pageId=81788594

## jdreact改造

### jdreact入口改造

修改jdreact工程中的入口指向，以jdreact-jsbundle-jdreactbusinessrank工程为例，修改jdreact-jsbundle-jdreactbusinessrank/jsbundles/JDReactBusinessRank.js 文件中

<div><img src='https://img14.360buyimg.com/imagetools/jfs/t1/145155/32/20059/1464364/5fe43e29E4aa2fa13/b9f64a5a2f58b1f5.jpg'/></div>

### jdreact package.json改造

其中红色部分为新增部分

{

  "name": "jdreact-jsbundle-JDReactBusinessRank",

  "version": "1.0.0",

  "description": "",

  "main": "index.js",

  "license": "MIT",

  "scripts": {

​    "clean": "rm -rf node_modules/@jdreact/* && rm -rf node_modules/react-native && rm -rf scripts",

​    "update": "npm run clean && npm install",

​    "postinstall": "cp -rf node_modules/@jdreact/jdreact-core-scripts/scripts . &&  cp -rf node_modules/@jdreact/jdreact-core-scripts/patch/* node_modules/",

​    "start": "node node_modules/react-native/local-cli/cli.js start",

​    "web-init": "node ./node_modules/@jdreact/jdreact-core-web/local-cli/cli.js init",

​    "web-start": "cross-env NODE_ENV=development webpack-dev-server --config ./web/webpack.config.dev.js",

​    "web-bundle": "cross-env NODE_ENV=production webpack --config ./web/webpack.config.prod.js",

​    "bi": "rm -rf outputBundle && ./scripts/make-fullpack-jsbundles.sh -p ios -m JDReactBusinessRank",

​    "ba": "rm -rf outputBundle && ./scripts/make-fullpack-jsbundles.sh -p android -m JDReactBusinessRank"

  },

  "repository": {

​    "type": "git",

​    "url": ""

  },

  "dependencies": {

​    "@ant-design/react-native": "^3.2.2",

​    "@jdreact/jdreact-core-lib": "^2.0.11",

​    "@jdreact/jdreact-core-scripts": "^2.0.3",

   <span style="color:red"> "@tarojs/components": "2.2.13",</span>

   <span style="color:red"> "@tarojs/components-qa": "2.2.13",</span>

   <span style="color:red"> "@tarojs/components-rn": "2.2.13",</span>

​    <span style="color:red">"@tarojs/redux": "2.2.13",</span>

   <span style="color:red"> "@tarojs/router": "2.2.13",</span>

​    <span style="color:red">"@tarojs/taro": "2.2.13",</span>

   <span style="color:red"> "@tarojs/taro-h5": "2.2.13",</span>

   <span style="color:red"> "@tarojs/taro-redux-rn": "2.2.13",</span>

   <span style="color:red"> "@tarojs/taro-rn": "2.2.13",</span>

​    <span style="color:red">"@tarojs/taro-router-rn": "2.2.13",</span>

   <span style="color:red"> "babel-runtime": "^6.26.0",</span>

   <span style="color:red"> "classnames": "^2.2.6",</span>

   <span style="color:red"> "crypto-js": "^3.1.9-1",</span>

​    <span style="color:red">"dva-core": "^2.0.2",</span>

   <span style="color:red"> "expo-av": "^6.0.0",</span>

   <span style="color:red"> "expo-barcode-scanner": "^6.0.0",</span>

   <span style="color:red"> "expo-brightness": "^6.0.0",</span>

​    <span style="color:red">"expo-camera": "^6.0.0",</span>

   <span style="color:red"> "expo-constants": "^6.0.0",</span>

   <span style="color:red"> "expo-image-picker": "^6.0.0",</span>

​    <span style="color:red">"expo-linear-gradient": "^6.0.0",</span>

   <span style="color:red"> "expo-permissions": "^6.0.0",</span>

   <span style="color:red"> "expo-sensors": "^6.0.0",</span>

   <span style="color:red"> "lodash": "^4.17.15",</span>

   <span style="color:red"> "moment": "^2.29.0",</span>

   <span style="color:red"> "nerv-devtools": "^1.5.5",</span>

​    <span style="color:red">"nervjs": "^1.5.5",</span>

​    <span style="color:red">"react": "16.8.3",</span>

   <span style="color:red"> "react-native": "0.59.9",</span>

   <span style="color:red"> "react-native-section-alphabet-list": "^1.0.1",</span>

​    <span style="color:red">"redux": "^4.0.0",</span>

​    <span style="color:red">"redux-logger": "^3.0.6",</span>

  <span style="color:red">"redux-thunk": "^2.3.0",</span>

   <span style="color:red"> "taro-ui": "^2.2.4"</span>

  },

  "devDependencies": {

​    "@jdreact/jdreact-core-web": "^3.0.0",

   <span style='color:red'> "@tarojs/mini-runner": "2.2.13",</span>

​    <span style='color:red'>"@tarojs/webpack-runner": "2.2.13",</span>

​    <span style='color:red'>"@types/react": "^16.4.8",</span>

   <span style='color:red'> "@types/webpack-env": "^1.13.6",</span>

   <span style='color:red'> "@typescript-eslint/eslint-plugin": "^2.13.0",</span>

​    <span style='color:red'>"@typescript-eslint/parser": "^2.13.0",</span>

   <span style='color:red'> "babel-eslint": "^8.2.3",</span>

​    <span style='color:red'>"babel-plugin-transform-class-properties": "^6.24.1",</span>

   <span style='color:red'> "babel-plugin-transform-decorators-legacy": "^1.3.4",</span>

​    <span style='color:red'>"babel-plugin-transform-jsx-stylesheet": "^0.6.5",</span>

​    <span style='color:red'>"babel-plugin-transform-object-rest-spread": "^6.26.0",</span>

​    <span style='color:red'>"babel-plugin-transform-runtime": "^6.23.0",</span>

​    <span style='color:red'>"babel-preset-env": "^1.6.1",</span>

​    <span style='color:red'>"eslint": "^5.16.0",</span>

​    <span style='color:red'>"eslint-config-taro": "2.2.13",</span>

​    <span style='color:red'>"eslint-plugin-import": "^2.12.0",</span>

   <span style='color:red'> "eslint-plugin-react": "^7.8.2",</span>

   <span style='color:red'> "eslint-plugin-react-hooks": "^1.6.1",</span>

   <span style='color:red'> "eslint-plugin-taro": "2.2.13",</span>

​    <span style='color:red'>"stylelint": "9.3.0",</span>

​    <span style='color:red'>"stylelint-config-taro-rn": "2.2.13",</span>

​    <span style='color:red'>"stylelint-taro-rn": "2.2.13",</span>

   <span style='color:red'> "typescript": "^3.0.1"</span>

  }

}

# 原生工程接入

## Android

## ios

# Taro改造

## package.json改造

添加的包见红色部分

{

  "name": "template-app-ts",

  "version": "1.0.0",

  "private": true,

  "description": "template-app-ts",

  "templateInfo": {

​    "name": "redux",

​    "typescript": true,

​    "css": "sass"

  },

  "scripts": {

​    // 省略

  },

  "author": "",

  "license": "MIT",

  "dependencies": {

​    "@ant-design/react-native": "^3.2.2",

   <span style='color:red'> "@jdreact/jdreact-core-lib": "^2.0.11",</span>

​    <span style='color:red'>"@jdreact/jdreact-core-scripts": "^2.0.3",</span>

​    "@tarojs/components": "2.2.13",

​    "@tarojs/components-qa": "2.2.13",

​    "@tarojs/components-rn": "2.2.13",

​    "@tarojs/redux": "2.2.13",

​    "@tarojs/redux-h5": "2.2.13",

​    "@tarojs/rn-runner": "2.2.13",

​    "@tarojs/router": "2.2.13",

​    "@tarojs/taro": "2.2.13",

​    "@tarojs/taro-redux-rn": "2.2.13",

​    "@tarojs/taro-rn": "2.2.13",

​    "@tarojs/taro-router-rn": "2.2.13",

​    "babel-plugin-import": "^1.13.0",

​    "babel-runtime": "^6.26.0",

​    "classnames": "^2.2.6",

​    "crypto-js": "^3.1.9-1",

​    "dva-core": "^2.0.2",

​    "expo-linear-gradient": "^6.0.0",

​    "lodash": "^4.17.15",

​    "moment": "^2.29.1",

​    "nerv-devtools": "^1.5.5",

​    "nervjs": "^1.5.5",

​    "react": "16.8.0",

​    "react-native": "0.59.9",

​    "react-native-image-zoom-viewer": "^2.2.27",

​    "redux": "^4.0.0",

​    "regenerator-runtime": "0.11.1",

​    "require-context": "^1.1.0",

​    "rimraf": "^3.0.2",

​    "taro-ui": "^2.2.4"

  },

  "devDependencies": {

   <span style='color:red'> "@jdreact/jdreact-core-web": "^2.0.2",</span>

​    "@tarojs/mini-runner": "2.2.13",

​    "@tarojs/plugin-sass": "2.2.13",

​    "@tarojs/plugin-terser": "2.2.13",

​    "@tarojs/webpack-runner": "2.2.13",

​    "@types/react": "^16.4.8",

​    "@types/webpack-env": "^1.13.6",

​    "@typescript-eslint/eslint-plugin": "^2.13.0",

​    "@typescript-eslint/parser": "^2.13.0",

​    "babel-eslint": "^8.2.3",

​    "babel-plugin-transform-class-properties": "^6.24.1",

​    "babel-plugin-transform-decorators-legacy": "^1.3.4",

​    "babel-plugin-transform-jsx-stylesheet": "^0.6.5",

​    "babel-plugin-transform-object-rest-spread": "^6.26.0",

​    "babel-plugin-transform-runtime": "^6.23.0",

​    "babel-preset-env": "^1.6.1",

​    "eslint": "^5.16.0",

​    "eslint-config-taro": "2.2.13",

​    "eslint-plugin-import": "^2.12.0",

​    "eslint-plugin-react": "^7.8.2",

​    "eslint-plugin-react-hooks": "^1.6.1",

​    "eslint-plugin-taro": "2.2.13",

​    "stylelint": "9.3.0",

​    "stylelint-config-taro-rn": "2.2.13",

​    "stylelint-taro-rn": "2.2.13",

​    "typescript": "^3.0.1"

  }

}

## 编写插件

编写的插件主要用于将Taro rn端的编译目录rn_temp 实时copy到jdreact目录下，插件已写好，位于template-app-ts/plugins/copy-rn-jdreact.js

# 运行

开发文档见03 develop-introduce.md文档，当前框架启动有先后顺序要求，因为jdreact的内容来源于taro,所以应该先启动Taro,后启动jdreact

## 配置jdreact目录位置

在config.js中 copyRnPlugin变量中配置jdreact工程，以jdreact-jsbundle-jdreactbusinessrank 工程为例

<div><img src='https://img14.360buyimg.com/imagetools/jfs/t1/137943/24/19908/1544680/5fe43592E2c77c7f1/f9b1e1b00ade867e.png'/></div>

## 运行Taro

修改Taro package.json中build:rn命令，指定端口为非8081端口, 当前框架内指定为8082端口

"build:rn": "taro build --type rn  <span style="color:red">--port 8082"</span>

### 安装npm包

### 启动Taro

运行 npm run dev:rn 命令进行启动,启动完成后jdreact工程中生成rn_temp目录

<div><img src='https://img13.360buyimg.com/imagetools/jfs/t1/140570/11/19879/2308176/5fe433d5E08fa6049/f06ade4ca33e7e59.gif' /></div>

## 运行jdreact

进入在Taro中指定的jdreact工程

### 安装npm包

### 启动jdreact

运行 npm start 

<div><img src='https://img11.360buyimg.com/imagetools/jfs/t1/150066/12/19707/539511/5fe436e7E7a7f2b5e/6efeab3c35fee96d.gif'/></div>

## 运行原生工程

### 配置jdreact工程

<div><img src='https://img13.360buyimg.com/imagetools/jfs/t1/149183/26/19733/1841115/5fe437beE40817668/d5c1eda7b0a03c69.jpg' /></div>

### 启动原生工程

点击菜单栏的运行按钮即可

<div><img  src='https://img13.360buyimg.com/imagetools/jfs/t1/141431/8/20241/1725883/5fe43d61E3c72e482/17b0359e09a2f98b.gif'/></div>

