import Taro, { Component } from '@tarojs/taro';
import {
    ScrollView,
    RefreshControl
} from "react-native";
import './index.scss';

class DataList extends Component<any, any> {
    static defaultProps = {
        refreshing: false,
        onEndReached: function (): void {
        },
        onRefresh: function (): void {
        },
        onScroll: function (): void {
        }
    };

    constructor(props: any) {
        super(props);
        this.state = {};
        this._contentViewScroll = this._contentViewScroll.bind(this);
    }

    _contentViewScroll(e: Record<string, any>) {
        const offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        const contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        const oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight + 10 >= contentSizeHeight) {
            this.props.onEndReached(e);
        }
    }


    render() {
        return <ScrollView
            style={{ flex: 1 }}
            onMomentumScrollEnd={this._contentViewScroll}
            onScroll={this.props.onScroll}
            refreshControl={
                <RefreshControl
                    refreshing={this.props.refreshing}
                    onRefresh={this.props.onRefresh}
                />
            }
        >
            {this.props.children}
        </ScrollView>
    }
}

export default DataList as ComponentClass<PageOwnProps, PageState>;