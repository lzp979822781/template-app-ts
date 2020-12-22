# Taro jdreact和原生通信原理

## 通信原理图



![taro通信原理图](/Users/liuzhipeng26/Downloads/taro通信原理图.png)

## 通信原理说明

主要原理是jdreact充当Taro的容器，然后原生加载jdreact jsbundle

第一步 Taro -> jdreact  

```
在template-app-ts下运行npm run dev:rn 生成rn_temp目录并将其copy到jdreact目录下
```

第二步 jdreact启动

```
在jdreact目录下运行npm run start 加载当前工程下的rn_temp
```

第三步 原生 -> jdreact

```
jdreact启动后会生成jsbundle访问链接，原生通过加载这个链接实现加载jdreact代码
 NSString *debugUrl = [NSString stringWithFormat:@"http://localhost:8081/jsbundles/%@.bundle?platform=ios&dev=true", moduleName];
JDReactNativeBaseView *rnView = [[JDReactNativeBaseView alloc] initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT) debugURL:debugUrl appName:moduleName properties:nil extraModulesDelegate:self];
```










