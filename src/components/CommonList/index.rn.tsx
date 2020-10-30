/* eslint-disable @typescript-eslint/no-use-before-define */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { FlatList, RefreshControl } from 'react-native';
import "./index.scss";


interface ReadonlyStringArray {
    readonly [index: number]: string;
}

type baseProps = {
    data: ReadonlyStringArray;
    loaded?: boolean;
    noMoreShow?: boolean;
    refreshing?: boolean;
    ListFooterComponent?: Function | JSX.Element;
    ListEmptyComponent?: Function | JSX.Element;
    renderItem?: Function;
}

export default class CommonList extends Component<baseProps, any> {
    static defaultProps = {
        loaded: false,
        data: [],
        refreshing: false,
        noMoreShow: true,
        statusCode: "1",
        renderItem: () => {
            return (
                <View>
                    <Text>1</Text>
                </View>
            );
        },
        onEndReached: () => null,
        onRefresh: () => null,
        ListFooterComponent: () => {
            return (
                <View
                    style={{ paddingBottom: 50, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={{ color: "#C8C8C8", fontSize: 12 }}>～没有更多数据了～</Text>
                </View>
            );
        },
        ListEmptyComponent: () => {
            return <View className='item-image-none'>
                <Image
                    className='item-image-none-icon'
                    src='https://img12.360buyimg.com/imagetools/jfs/t1/121246/7/12582/29481/5f5f49cdE3b123199/8cb12f08a4713104.png'
                />
                <Text className='item-image-none-txt' >暂无数据</Text>
            </View>
        },
    };

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    ListFooterComponent = () => {
        const { noMoreShow, ListFooterComponent } = this.props;
        if (noMoreShow && ListFooterComponent && typeof ListFooterComponent === "function") {
            return ListFooterComponent();
        };
        return <View style={{ height: 15 }}></View>;
    };

    ListEmptyComponent = () => {
        const { loaded, ListEmptyComponent } = this.props;
        if (loaded && ListEmptyComponent && typeof ListEmptyComponent === "function") {
            return ListEmptyComponent();
        };

        return null;
    };

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
                        tintColor='#F23030'
                        title='刷新...'
                        titleColor='#666666'
                        // colors={["#ff0000", "#00ff00", "#0000ff"]}
                        // progressBackgroundColor='#F23030'
                        refreshing={this.props.refreshing}
                        onRefresh={this.props.onRefresh}
                    />
                }
            />
        );
    };

};