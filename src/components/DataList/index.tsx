import Taro, { Component } from "@tarojs/taro";
import { ScrollView } from "@tarojs/components";
import "./index.scss";

interface ListOption {
    refreshing: boolean;
    minusHeight: number;
    onEndReached: () => void;
    onRefresh: () => void;
    onScroll: () => void;
    style?: object | string;
}

class DataList extends Component<ListOption, any> {
    static defaultProps = {
        minusHeight: 0,
        refreshing: false,
        onEndReached: function(): void {
        },
        onRefresh: function(): void {
        },
        onScroll: function(): void {
        }
    };

    constructor(props: ListOption) {
        super(props);
        this.state = {
            res: {
                windowHeight: 1200
            }
        };
    }

    componentWillMount() {
        Taro.getSystemInfo({
            success: res => {
                this.setState({
                    res
                });
            }
        }).then(res => console.log(res));
    }

    onListRefresh() {
        if (this.props.onRefresh) {
            this.props.onRefresh();
        }
    }

    onScrollToLower(e) {
        this.props.onEndReached(e);
    }

    onScroll(e) {
        this.props.onScroll(e);
    }

    render() {
        const scrollTop = 0;
        const Threshold = 20;

        const {
            res: { windowHeight }
        } = this.state;
        const { minusHeight, refreshing } = this.props;
        // 获取设备信息，小程序 h5,需要一个固定高度去支持滚动，注：设置height：100%无效，必须是固定高度
        const styleH = { height: `${windowHeight - minusHeight}px` };
        return (
            <ScrollView
                className='scrollview'
                style={styleH}
                refresherEnabled
                refresherThreshold={45}
                refresherTriggered={refreshing}
                scrollY
                scrollWithAnimation
                scrollTop={scrollTop}
                lowerThreshold={Threshold}
                upperThreshold={Threshold}
                onScrollToLower={this.onScrollToLower.bind(this)}
                onRefresherRefresh={this.onListRefresh.bind(this)}
                onScroll={this.onScroll.bind(this)}
            >
                {this.props.children}
            </ScrollView>
        );
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default DataList;
