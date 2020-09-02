import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Text, Image } from "@tarojs/components";
import DataList from "@/components/DataList/index";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";
import Request from "@/utils/Request";
import "./index.scss";

export default class PurchaseRelation extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            refreshing: false,
            data: [1, 2, 3]
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    config: Config = {
        navigationBarTitleText: "",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    componentDidShow() {
        // this.loadList();
    }

    loadList = async () => {
        // setTimeout(() => {
        //     this.setState({
        //         refreshing: false
        //     });
        // }, 3000);
        // return ;
        // Taro.showLoading({
        //     title: "加载中"
        // });
        // this.setState({
        //     refreshing: true
        // });
        const { currentPage, active } = this.state;
        try {
            const res = await Request.get("api_partnerVender_list", {
                currentPage: currentPage,
                pageSize: 10,
                venderType: active.id
            });

            let listData = this.state.data;
            let data = [];
            if (res.data.data) {
                data = res.data.data.result;
            }

            if (currentPage === 1) {
                listData = data;
            } else {
                listData = listData.concat(data);
            }

            // console.log("res", res);
            this.setState(
                {
                    data: listData,
                    refreshing: false,
                    ...res.data.data.page
                    //   statusCode: response.code,
                },
                () => {
                    if (data.length < this.state.pageSize) {
                        this.canAction = false;
                    } else {
                        setTimeout(() => {
                            this.canAction = true;
                        }, 50);
                    }
                }
            );
        } catch (e) {
            console.log("e", e);
        }
        // Taro.hideLoading();
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
