import Taro, { Component } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import { AtSwipeAction } from "taro-ui"
import "./index.scss";


class SwipeAction extends Component {
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
    }

    constructor(props) {
        super(props);
    }

    render() {

        const options = this.props.options.map((item) => {
            return {
                ...item,
                text: item.text,
                style: item.style
            }
        });

        return (
            <AtSwipeAction
                disabled={this.props.disabled}
                autoClose={this.props.autoClose}
                options={options}
                onClick={this.props.onClick}
                onOpened={this.props.onOpened}
                onClosed={this.props.onClosed}
            >
                {this.props.children}
            </AtSwipeAction>
        )
    }
}


export default SwipeAction;
