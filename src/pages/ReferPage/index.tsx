import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Text } from "@tarojs/components";
import DataList from "@/components/DataList/index";
import "./index.scss";

export default class PagePicker extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            value: ""
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    config: Config = {
        navigationBarTitleText: "参照",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    componentDidShow() {
        this.loadList();
    }

    componentDidMount() {
        this.setState({
            value: this.$router.params.id
        });
    }

    loadList() {
        setTimeout(() => {
            this.setState({
                refreshing: false,
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

    onOK(val) {
        Taro.navigateBack({
            success: () => {
                Taro.eventCenter.trigger("changeRefer", val);
            }
        });
    }

    renderItems() {
        const dataSource = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const {value}  = this.state;
        return dataSource.map((item, index) => {
            const boolen = value === "参照-"+item
            const className = boolen ? "item-title-select" : "item-title";
            return (
                <View
                    hoverClass="list-item-hover"
                    hoverStyle={{
                        backgroundColor: "#eeeeee"
                    }}
                    className="list-item"
                    onClick={() => {
                        let val = "参照-" + item;
                        this.onOK(val);
                    }}
                >
                    <Text className={className}>参照-{item}</Text>
                </View>
            );
        });
    }

    render() {
        return (
            <View className="list">
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
