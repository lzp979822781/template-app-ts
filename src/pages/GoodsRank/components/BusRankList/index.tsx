import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { FlatList, RefreshControl } from 'react-native';
import ListItem from '../ListItem';

import './index.scss';

const PREFIX = 'bus-list';
const EMPTY_PREFIX = `${PREFIX}-empty`;

const imgObj = {
    emptySrc: 'https://img14.360buyimg.com/imagetools/jfs/t1/129925/9/12107/31518/5f83c943E94b00976/7f5435143d1b0c2a.png',

}

interface PageOwnProps {
    data: Array<any>,
    refreshing: boolean,
    onRefresh: () => any,
    noMoreShow: boolean, // 是否最后一页
    ListFooterComponent: Function,
    onEndReached: Function;
}

class BusRankList extends Component<PageOwnProps> {

    static defaultProps = {
        noMoreShow: false,
        ListFooterComponent: () => {
            return (
                <View
                    style={{ marginTop:10, paddingBottom: 50, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={{ color: "#C8C8C8", fontSize: 12 }}>～没有更多数据了～</Text>
                </View>
            );
        }
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderItem = ({ item, index }) => (<ListItem key={item.id} data={item} dataIndex={index} />)

    renderGap = () => {
        return (
            <View className={`${PREFIX}-gap`}></View>
        );
    }

    ListEmptyComponent = () => {
        return (
            <View className={EMPTY_PREFIX}>
                <View className={`${EMPTY_PREFIX}-img`}>
                    <Image className={`${EMPTY_PREFIX}-img-icon`} src={imgObj.emptySrc} />
                </View>
                <View className={`${EMPTY_PREFIX}-content`}>
                    <Text className={`${EMPTY_PREFIX}-content-text`}>您还没有商品排行榜哦~</Text>
                </View>
            </View>
        );
    }

    ListFooterComponent = () => {
        const { data, noMoreShow, ListFooterComponent } = this.props;
        if (data.length > 0 && noMoreShow && ListFooterComponent && typeof ListFooterComponent === "function") {
            return ListFooterComponent();
        };
        return <View style={{ height: 15 }}></View>;
    };

    render() {
        const { data, refreshing, onRefresh, onEndReached } = this.props;

        return (
            <View className={PREFIX}>
                <FlatList 
                    data={data}
                    renderItem={(param) => this.renderItem(param)}
                    // ItemSeparatorComponent={this.renderGap}
                    onEndReachedThreshold={0.01}
                    onEndReached={onEndReached}
                    ListEmptyComponent={this.ListEmptyComponent}
                    ListFooterComponent={this.ListFooterComponent}
                    refreshControl={
                        <RefreshControl
                            tintColor='#F23030'
                            title='刷新...'
                            titleColor='#666666'
                            // colors={["#ff0000", "#00ff00", "#0000ff"]}
                            // progressBackgroundColor='#F23030'
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        );
    }
}

export default BusRankList;