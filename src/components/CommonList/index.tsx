import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text, ScrollView } from '@tarojs/components';
import './index.scss';

class CommonList extends Component {
    static defaultProps = {
        data: [],
        refreshing: true,
        noMoreShow: false,
        renderItem: ({ item, index }) => {
            return (
                <View>
                    <Text>{item}</Text>
                </View>
            );
        },
        onEndReached: () => { },
        onRefresh: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderItems = () => {
        const { data } = this.props;
        return data.map((item, index) => {
            const obj = {
                item,
                index
            }

            return this.renderItem(obj)
        })
    }

    renderItem = ({ item, index }) => {
        return (
            <View>
                <Text>{item}</Text>
            </View>
        );
    }

    render() {
        return (
            <ScrollView>
                {this.renderItems()}
            </ScrollView>
        );
    }
}

export default CommonList;