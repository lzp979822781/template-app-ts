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
    onRefresh: () => any
}

class BusRankList extends Component<PageOwnProps> {
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

    render() {
        const { data, refreshing, onRefresh } = this.props;

        return (
            <View className={PREFIX}>
                <FlatList 
                    data={data}
                    renderItem={(param) => this.renderItem(param)}
                    // ItemSeparatorComponent={this.renderGap}
                    ListEmptyComponent={this.ListEmptyComponent}
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