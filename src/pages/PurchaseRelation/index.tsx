import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Text, Image } from "@tarojs/components";
import DataList from "@/components/DataList/index";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";
import JDRequest from "@/utils/jd-request";
import ClockIcon from "@/assets/images/clock-icon@3x.png";
import "./index.scss";

export default class PurchaseRelation extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pageSize: 20,
            refreshing: false,
            data: []
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

    loadList = async () => {
        const params = this.$router.params;
        
        Taro.showLoading({
            title: "加载中"
        });
        const { currentPage, pageSize } = this.state;
        const res = await JDRequest.get(
            "mjying_assist_buyer_relation_queryPage",
            {
                pin: params.pin,
                pageNum: currentPage,
                pageSize: pageSize
            }
        );

        let listData = this.state.data;
        let data = [];
        if (res.success) {
            data = res.data.data;
        }

        if (currentPage === 1) {
            listData = data;
        } else {
            listData = listData.concat(data);
        }

        this.setState(
            {
                data: listData,
                refreshing: false
            },
            () => {
                if (data.length < this.state.pageSize) {
                    this.canAction = false;
                } else {
                    setTimeout(() => {
                        this.canAction = true;
                    }, 50);
                };

                Taro.hideLoading();
            }
        );
        
    };

    onRefresh() {
        this.setState(
            {
                refreshing: true,
                currentPage: 1
            },
            () => {
                this.loadList();
            }
        );
    }

    canAction = false;
    onEndReached() {
        // Taro.showToast({
        //     title: "底部",
        //     icon: "none",
        //     duration: 500
        // }).then(res => console.log(res));
        // return ;
        if (this.canAction) {
            Taro.showLoading({
                title: "加载中"
            });
            this.canAction = false;
            const currentPage = this.state.currentPage + 1;

            this.setState(
                {
                    currentPage
                },
                () => {
                    this.loadList();
                }
            );
        }
    }

    renderItems() {
        const dataSource = this.state.data;

        const Shadow = {
            // shadowColor: "#242424",
            // shadowOffset: { w: 10, h: 2 },
            // shadowOpacity: 0.1,
            // shadowRadius: 10,
            // elevation: 2
        };

        if(dataSource.length === 0){
            return <Text className='purchaseRelation-list-none' >暂无数据</Text>
        }

        return dataSource.map((item, index) => {
            const className =
                index === 0 ? "list-item-box top-gap" : "list-item-box";
            return (
                <View key={item} style={Shadow} className={className}>
                    <View className="list-item">
                        <View className="list-image-box">
                            <Image
                                className="item-image"
                                src="https://taro-ui.jd.com/img/logo-taro.png"
                            />
                        </View>
                        <View className="content-box">
                            <Text className="item-title">
                                测试商品日用百货-{item}
                            </Text>
                        </View>
                    </View>
                    <View className="item-division"></View>
                    <View className="item-dec">
                        <Image className="item-dec-icon" src={ClockIcon} />
                        <Text className="item-dec-txt">
                            建材时间：2018.08.25 12:00:00
                        </Text>
                    </View>
                </View>
            );
        });
    }

    render() {
        return (
            <View className="container">
                <StatusBar />
                <Header title="建采关系" />
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
