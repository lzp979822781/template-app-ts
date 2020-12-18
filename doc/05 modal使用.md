# 组件含义说明

该组件即弹框组件

# 属性说明

|               | 返回值类型     | 默认值    |      | 说明                                          |
| ------------- | -------------- | --------- | ---- | --------------------------------------------- |
| visible       | boolean        | false     |      | 弹框是否可见                                  |
| className     | undefined      | undefined |      | 样式属性rn端转换为style的值注意单位之间的换算 |
| maskClosable  | boolean        | true      |      | 点击蒙层是否允许关闭                          |
| transparent   | boolean        | false     |      | 是否背景透明                                  |
| closable      | boolean        | false     |      | 是否显示关闭按钮                              |
| onClose       | (): void       | 无        |      | 点击关闭时回调                                |
| renderContent | Taro.Component | 无        |      | 弹框中的渲染内容                              |
|               |                |           |      |                                               |

# 示例说明

```
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { Modal, Gradient } from '@/components';
import './index.scss';

class TaroModal extends Component {
		constructor(props) {
        super(props);
        this.state = {  
            showModal: false
        };
    }
    
    renderContent = () => {

        const text = `由于微信分享限制，可以通过口令的方式分享商品，好友复制口令后打开药京采，可直接查看`;
        return (
            <View className={`${PREFIX}-modal-content-container`}>
                <Text className={`${PREFIX}-modal-content-container-text`}>{text}</Text>
            </View>
        );
    }
    
    renderModal = () => {
        const { showModal } = this.state;

        return (
            <Modal
                className={`modal`}
                visible={showModal}
                // eslint-disable-next-line taro/render-props
                renderContent={this.renderContent()}
            />
        );
    }
    
    render() {
    	return (
            <View className={PREFIX}>
                { this.renderModal()}
            </View>
        );
    }
}

```

