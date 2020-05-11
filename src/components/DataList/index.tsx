import Taro, { Component } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import "./index.scss";


class DataList extends Component {
    static defaultProps = {
        refreshing: false,
        onListEndReached: function (): void {
        },
        onScrollToLower: function (): void {
        },
        onScroll: function (): void {
        },
    }
    
    constructor(props) {
        super(props);
    }

    onListRefresh() {
        this.props.onRefresh();
    }

    onScrollToLower(e) {
        this.props.onEndReached(e);
    }

    onScroll(e) {
        // console.log("e.detail")
        this.props.onScroll(e);
    }

    render() {

        const scrollTop = 0
        const Threshold = 20

        return (
            <ScrollView
                className='scrollview'
                refresherEnabled={true}
                refresherThreshold={45}
                refresherTriggered={this.props.refreshing}
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
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default DataList;
