# 组件含义说明

该组件为抽屉组件，即从侧面弹出的组件，抽屉组件使用的时候需要注意，抽屉组件的显示区是根据包裹的内容高度决定的

# 属性说明

|                       | 返回值类型         | 默认值                                         | 说明                |
| --------------------- | ------------------ | ---------------------------------------------- | ------------------- |
| show                  | boolean            | false                                          | 是否展示抽屉        |
| renderSidebar         | Taro.element       |                                                | 抽屉中展示的内容    |
| drawerBackgroundColor | string             | #fff                                           | 抽屉组件背景颜色    |
| drawerWidth           | number             | 305                                            | 抽屉的宽度          |
| onOpenChange          | (open: bool): void | -                                              | open 状态切换时调用 |
| position              | String             | 'left', enum{'left', 'right', 'top', 'bottom'} | 抽屉所在位置        |
|                       |                    |                                                |                     |





# 示例说明

```
/* eslint-disable taro/render-props */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { Drawer } from '@/components';

interface PageOwnState {
    show: boolean
}

class Demo extends Component<any, PageOwnState> {
    constructor(props) {
        super(props);
        this.state = {  
            show: false
        };
    }

    onClose = () => {
        this.setState({ show: false })
    }

    renderSidebar = () => {
        return (
            <View style={{ marginTop: 50 }}>
                <Text>侧边栏内容</Text>
                <Button type='primary' onClick={this.onClose}>关闭抽屉</Button>
            </View>
        );
    }

    onOpenModal = () => {
        this.setState({ show: true })
    }

    render() {
        const { show } = this.state;
        return (
            <View>
                <Drawer 
                    show={show}
                    drawerBackgroundColor='#dedede'
                    drawerWidth={365}
                    renderSidebar={this.renderSidebar()}
                >
                    <View style={{ marginTop: 50, height: 1000 }}>
                        <Button type='primary' onClick={this.onOpenModal}>打开抽屉</Button>
                    </View>
                    
                </Drawer>
            </View>
        );
    }
}

export default Demo;

```

