import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { FlatList } from 'react-native';
import ListItem from '../ListItem';

import './index.scss';

const PREFIX = 'bus-list';
const EMPTY_PREFIX = `${PREFIX}-empty`;

const imgObj = {
    emptySrc: 'https://img14.360buyimg.com/imagetools/jfs/t1/129925/9/12107/31518/5f83c943E94b00976/7f5435143d1b0c2a.png',

}

interface PageOwnProps {
    data: Array<any>
}

class BusRankList extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  
        };
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
                    <Text className={`${EMPTY_PREFIX}-content-text`}>暂无相关结果哦~</Text>
                </View>
            </View>
        );
    }

    render() {
        const { data } = this.props;

        return (
            <View className={PREFIX}>
                <FlatList 
                    data={data}
                    renderItem={(param) => this.renderItem(param)}
                    ItemSeparatorComponent={this.renderGap}
                    ListEmptyComponent={this.ListEmptyComponent}
                />
            </View>
        );
    }
}

export default BusRankList;