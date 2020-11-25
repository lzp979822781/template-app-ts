import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { FlatList } from 'react-native';
import ListItem from '../ListItem';

import './index.scss';

const PREFIX = 'bus-list';

interface PageOwnProps {
    data: Array<any>
}

interface PageOwnState {

}

class BusRankList extends Component<PageOwnProps, PageOwnState> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    renderItem = ({ item, index }) => (<ListItem key={item.id} data={item} dataIndex={index} />)

    render() {
        const { data } = this.props;

        return (
            <View className={PREFIX}>
                <FlatList 
                    data={data}
                    renderItem={(param) => this.renderItem(param)}
                />
            </View>
        );
    }
}

export default BusRankList;