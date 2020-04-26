# 框架

## 原理

### 基本原理

源代码->词法/语法/语义分析->抽象语法树->转换->目标代码

![6rq2EfR.png!web](https://img1.tuicool.com/6rq2EfR.png!web)

抽象语法树 AST

![nmi6bm2.png!web](https://img1.tuicool.com/nmi6bm2.png!web)

### Taro原理

Taro: 多端统一开发框架，支持用 React 的开发方式编写一次代码，生成能运行在微信小程序、H5、React Native 等的应用

![vmqAZjB.png!web](https://img2.tuicool.com/vmqAZjB.png!web)

![2eyiAbI.png!web](https://img2.tuicool.com/2eyiAbI.png!web)

![QRfUbaB.png!web](https://img1.tuicool.com/QRfUbaB.png!web)

![NRJrmu2.png!web](https://img2.tuicool.com/NRJrmu2.png!web)

多端能力：提供对应端的runtime、组件、redux、router等实现

![6zAJJjN.png!web](https://img0.tuicool.com/6zAJJjN.png!web)

![rQFRzqb.png!web](https://img2.tuicool.com/rQFRzqb.png!web)

![2AfI3u3.png!web](https://img2.tuicool.com/2AfI3u3.png!web)

![AZfMrq7.png!web](https://img2.tuicool.com/AZfMrq7.png!web)

提供相应端的 `Runtime` 实现，具备适配 `API` 的能力

提供统一的基础组件，编译时替换为相应端的组件实现

### 多端适配

![img](https://user-gold-cdn.xitu.io/2018/10/8/16651824884a5682?imageslim)

![img](https://user-gold-cdn.xitu.io/2018/10/8/16651824b8ac59a4?imageslim)



## 目录结构

```
template-app-ts
├─global.d.ts
├─package.json
├─project.config.json
├─tsconfig.json
├─src // 源码目录
|  ├─app.rn.scss  // 全局rn 样式
|  ├─app.scss    // 全局样式
|  ├─app.tsx // 全局js入口
|  ├─index.html 
|  ├─store
|  |   └createStore.ts // redux store
|  ├─pages
|  |   ├─index.tsx // 统一导出页
|  |   ├─Index // 当前初始页面
|  |   |   ├─index.scss 
|  |   |   └index.tsx
|  ├─models // 全局模型
|  |   ├─hello.ts
|  |   ├─index.ts
|  |   └test.ts
|  ├─components // 公共组件库
|  |     ├─index.js 
|  |     ├─SearchBar
|  |     |     ├─index.scss
|  |     |     └index.tsx
├─scripts
|    └build-rn-jsbundle.js
├─doc
|  ├─abstract.md // Taro整体介绍文档
|  └develop-introduce.md // 开发示例文档
├─config // 配置目录
|   ├─dev.js // 开发时配置
|   ├─index.js // 默认配置
|   └prod.js // 打包时配置
```



# 多端开发

## 多端环境变量

内置环境变量：process.env.TARO_ENV， 取值如下

| weapp      | swan       | alipay | h5   | rn   | tt         | qq   | quickapp |
| ---------- | ---------- | ------ | ---- | ---- | ---------- | ---- | -------- |
| 微信小程序 | 百度小程序 | 阿里   | H5   | Rn   | 头条小程序 | Qq   | 快应用   |



## 多端js的处理

```
Home
├─index.h5.ts
├─index.rn.ts
├─index.ts
└index.wx.ts
```

默认加载index.ts 如RN端开发默认会去检测index.ts, 但是如果有index.rn.ts则会去加载index.rn.ts而不去加载index.ts

## 多端样式的处理

多端样式的支持有两种

```
(1)不同端使用不同的样式命名文件，此种方式与多端js加载方式相同，
  假设目录中同时存在以下文件：
  - index.scss
  - index.rn.scss
	当在 JS 文件中引用样式文件：import './index.scss' 时，RN 平台会找到并引入 index.rn.scss，其他平台会引入：index.scss，方便大家书写跨端样式，更好地兼容 RN。
	
(2)同一个样式文件
	如当前只有index.scss文件, 但是兼容处理不太多的情况下，可以使用条件编译。两种条件
		指定平台保留
  /*  #ifdef  %PLATFORM%  */
  样式代码
  /*  #endif  */
  
		指定平台剔除
	/*  #ifndef  %PLATFORM%  */
  样式代码
  /*  #endif  */
	
```



# 多端打包

参考Taro官网多端打包命令

# 多端部署

​	多端部署这方面目前taro并没有介绍相关的内容，因此各端独立参考部署

## 小程序

小程序按照小程序官网进行部署

## RN端部署

RN端部署是通过将rn 编译的临时包rn_temp打包到jdreact中，通过jdreact进行部署

![img](https://user-gold-cdn.xitu.io/2019/12/3/16ecc20205f90546?imageslim)

## H5部署

h5部署方式待定

# 注意事项

## taro cli安装注意事项

因为目前taro cli版本与组件版本是严格的对应关系，我们当时使用的taro 2.0.3版本的组件，因此在安装taro cli时也采用2.0.3的版本

## 开发注意事项

### js开发注意事项

(1) 事件绑定以on开头

(2) 不能使用 Array#map 之外的方法操作 JSX 数组，先处理好需要遍历的数组，然后再调用map方法

### css开发注意事项

#### 按照最小子集编写

三端中RN端的样式支持最弱，因此以RN端为标准。

- 布局只使用flex布局
- 样式选择器只支持类选择器不支持组合选择、嵌套选择



