import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Button, Text, Image } from "@tarojs/components";
import DataList from "@/components/DataList/index";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";
import "./index.scss";

export default class PurchaseRelation extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            current: 0
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    config: Config = {
        navigationBarTitleText: "",
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
        }, 3000);
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

        const Shadow = {
            // shadowColor: "#242424",
            // shadowOffset: { w: 10, h: 2 },
            // shadowOpacity: 0.1,
            // shadowRadius: 10,
            // elevation: 2
        };

        return dataSource.map((item, index) => {
            const className =
                index === 0 ? "list-item-box top-gap" : "list-item-box";
            return (
                <View key={item} style={Shadow} className={className}>
                    <View className='list-item'>
                        <View className='list-image-box'>
                            <Image
                                className='item-image'
                                src='https://taro-ui.jd.com/img/logo-taro.png'
                            />
                        </View>
                        <View className='content-box'>
                            <Text className='item-title'>
                                测试商品日用百货-{item}
                            </Text>
                        </View>
                    </View>
                    <View className='item-division'></View>
                    <View className='item-dec'>
                        <Text className='item-dec-txt'>
                            建材时间：2018.08.25 12:00:00
                        </Text>
                    </View>
                </View>
            );
        });
    }

    render() {
        return (
            <View className='container'>
                <StatusBar />
                <Header title='建采关系' />
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
