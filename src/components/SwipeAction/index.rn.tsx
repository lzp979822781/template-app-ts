import Taro, { Component } from '@tarojs/taro';
import {
    View
} from "react-native";
import { SwipeAction } from '@ant-design/react-native';

import './index.scss';

class SwipeActionRn extends Component<any, any> {
    static defaultProps = {
        disabled: false,
        autoClose: true,
        options: [{
            text: "编辑",
            style: { backgroundColor: 'orange', color: 'white' }
        },
        {
            text: "删除",
            style: { backgroundColor: 'red', color: 'white' }
        }],
        onClick: function (): void {

        },
        onOpened: function (): void {

        },
        onClosed: function (): void {

        }
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        const options = this.props.options.map((item) => {
            return {
                ...item,
                text: item.text,
                style: item.style || { backgroundColor: 'orange', color: 'white' },
                onPress: () => {
                    this.props.onClick(item);
                }
            }
        });

        return <SwipeAction
            disabled={this.props.disabled}
            autoClose={this.props.autoClose}
            right={options}
            onOpen={this.props.onOpened}
            onClose={this.props.onClosed}
            style={{ backgroundColor: 'transparent' }}
        >
            {this.props.children}
        </SwipeAction>
    }
}

export default SwipeActionRn as ComponentClass<PageOwnProps, PageState>;