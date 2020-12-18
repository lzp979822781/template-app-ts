# 组件含义说明

该组件为从底部弹出的活动页组件

# 属性说明

|                  | 返回值类型 | 默认值     | 说明                             |
| ---------------- | ---------- | ---------- | :------------------------------- |
| visible          | boolean    | false      | 是否展示底部弹框                 |
| rnStyle          | object     | 无         | 底部弹框外层样式(只对rn端有作用) |
| rnContainerStyle | object     | 无         | 弹框内容样式                     |
| maskClosable     | boolean    | true       | 点击遮罩层是否可关闭             |
| onClose          | undefined  | () => void | 点击关闭执行的回调函数           |
|                  |            |            |                                  |

# 示例说明

```
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { PopUp } from '@/components';

const rnStyle = {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
}

const rnContainerStyle = {
    paddingHorizontal: 10,
    paddingTop: 10
}

interface PageOwnState {
    visible: boolean
}

class Demo extends Component<any, PageOwnState> {
    constructor(props) {
        super(props);
        this.state = {  
            visible: false
        };
    }

    onOpenPop = () => {
        this.setState({ 
            visible: true
        })
    }

    onClose = () => {
        this.setState({ visible: false })
    }

    render() {
        const { visible } = this.state;
        return (
            <View>
                <Button type='primary' onClick={this.onOpenPop} style={{ marginTop: 60 }}>点击弹出弹框</Button>
                <PopUp
                    visible={visible}
                    rnStyle={rnStyle}
                    rnContainerStyle={rnContainerStyle}
                    onClose={this.onClose}
                >
                    <Button type='primary' onClick={this.onClose}>点击关闭</Button>
                    <View>
                        <Text>弹框内容</Text>
                    </View>
                </PopUp>
            </View>
        );
    }
}

export default Demo;
```

