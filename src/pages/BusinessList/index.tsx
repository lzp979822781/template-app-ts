import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Text, Image } from "@tarojs/components";
import DataList from "@/components/DataList/index";

import "./index.scss";

export default class PagePicker extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    config: Config = {
        navigationBarTitleText: "商家列表",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    componentDidShow() {
        this.loadList();
    }

    loadList() {
        setTimeout(() => {
            this.setState({
                refreshing: false
            });
        }, 2000);
    }

    onRefresh() {
        this.setState({
            refreshing: true
        });
        this.loadList();
    }

    onEndReached() {
        Taro.showToast({
            title: "底部",
            icon: "none",
            duration: 500
        }).then(res => console.log(res));
    }

    alertFn() {
        Taro.showToast({
            title: "按钮",
            icon: "none",
            duration: 500
        }).then(res => console.log(res));
    }

    renderItems() {
        const dataSource = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return dataSource.map(function(item){
            return (
                <View
                    key={item}
                    className='list-item-box'
                >
                    <View className='list-item'>
                        <View className='list-image-box'>
                            <Image
                                className='item-image'
                                src='https://taro-ui.jd.com/img/logo-taro.png'
                            />
                        </View>
                        <View className='content-box'>
                            <View>
                                <Text className='item-title'>
                                    北京市德云社制药集团大铁棍子分社-{item}
                                </Text>
                            </View>
                            <View className='item-dec'>
                                <Text className='item-dec-1'>
                                    上架
                                </Text>
                                <Text className='item-dec-3'>
                                    10000
                                </Text>
                                <Text className='item-dec-1'>
                                    品种
                                </Text>
                                <View className='item-dec-vertical-division'></View>
                                <Text className='item-dec-1'>
                                    起送金额1000元
                                </Text>
                            </View>
                            <View className='item-dec'>
                                <Text className='item-dec-2'>
                                    配送区域：北京，上海，深圳
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className='item-dec-division'></View>
                </View>
            )
        })
    }

    render() {
        return (
            <View className='list'>
                <DataList
                    minusHeight={0}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    onEndReached={this.onEndReached}
                >
                    <Block>{this.renderItems()}</Block>
                </DataList>
            </View>
        );
    }
}
