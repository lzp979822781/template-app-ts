import Taro, { Component, Config } from '@tarojs/taro';
import {
    View,
    Button,
    Text,
    FlatList,
    TouchableOpacity,
    RefreshControl
} from "react-native";
import './index.scss';

class CommonList extends Component {
    static defaultProps = {
        data: [],
        refreshing: true,
        noMoreShow: false,
        renderItem: ({ item }) => {
            return (
                <View>
                    <Text>1</Text>
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
    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this.props.renderItem}
                ListFooterComponent={this.ListFooterComponent}
                ListEmptyComponent={this.ListEmptyComponent}
                refreshing={this.props.refreshing}
                onEndReached={this.props.onEndReached}
                onEndReachedThreshold={0.01}
                refreshControl={
                    <RefreshControl
                        tintColor="#F23030"
                        title="刷新..."
                        titleColor="#666666"
                        colors={["#ff0000", "#00ff00", "#0000ff"]}
                        progressBackgroundColor="#F23030"
                        refreshing={this.props.refreshing}
                        onRefresh={this.props.onRefresh}
                    />
                }
            />
        );

    }

    ListFooterComponent = () => {
        if (this.props.noMoreShow) {
            return (
                <View
                    style={{ height: 40, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={{ color: "#C8C8C8", fontSize: 12 }}>～没有更多商品啦～</Text>
                </View>
            );
        }
        return <View style={{ height: 15 }}></View>;
    };

    ListEmptyComponent = () => {
        if (!this.props.refreshing) {
            return (
                <View
                    style={{
                        paddingTop: 100,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {/* <Image style={{ height: 150, width: 150 }} source={data.icon} /> */}
                    <Text
                        style={{
                            fontWeight: "bold",
                            marginTop: 15,
                            color: "#2E2D2D",
                            fontSize: 16,
                        }}
                    >
                        暂无相关商品
                    </Text>
                </View>
            );
        }

        return null;
    };
}

export default CommonList;