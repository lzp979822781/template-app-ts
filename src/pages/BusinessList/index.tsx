import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Text, Image } from "@tarojs/components";
import DataList from "@/components/DataList/index";
import { NativeModules } from "react-native";
import Request from "@/utils/Request";
import "./index.scss";

export default class ListPage extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            refreshing: false,
            data: [],
            active: {
                id: null,
                type: "1",
                title: "全部"
            }
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

    loadList = async () => {
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
        Taro.hideLoading();
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
        const { data } = this.state;

        return data.map(item => {
            return (
                <View key={item.id} className="list-item-box">
                    <View
                        className="list-item"
                        hoverClass="list-item-hover"
                        onClick={this.gotoShopDetail.bind(this, item.venderId)}
                        hoverStyle={{
                            backgroundColor: "#F8F8F8"
                        }}
                    >
                        <View className="list-left-box">
                            {item.shopLogo ? (
                                <View className="item-image-box">
                                    <Image
                                        className="item-image"
                                        src={`http:${item.shopLogo}`}
                                    />
                                </View>
                            ) : (
                                <Text className="item-image-none">药京采</Text>
                            )}
                        </View>
                        <View className="content-box">
                            <View>
                                <Text className="item-title">
                                    {item.companyName}
                                </Text>
                            </View>
                            <View className="item-dec">
                                <Text className="item-dec-1">上架</Text>
                                <Text className="item-dec-3">
                                    {item.upShelfSkuCount}
                                </Text>
                                <Text className="item-dec-1">品种</Text>
                                <View className="item-dec-vertical-division"></View>
                                <Text className="item-dec-1">
                                    起送金额{item.deliveryMoney}元
                                </Text>
                            </View>
                            <View className="item-dec">
                                <Text className="item-dec-2">
                                    配送区域：{item.operatingArea || "--"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        });
    }

    gotoShopDetail = venderId => {
        NativeModules.JDApplicationModule.gotoShopDetail(String(venderId));
    };

    renderTabs = () => {
        const { active } = this.state;
        const tabsData = [
            { title: "全部", type: "1", id: null },
            { title: "商品商家", type: "2", id: 1 },
            { title: "非药商家", type: "3", id: 2 },
            { title: "自营店铺", type: "4", id: 4 }
        ];
        return (
            <View className="tab-con">
                {tabsData.map(item => {
                    const classNameTxt =
                        active.type === item.type
                            ? "tab-item-txt-active"
                            : "tab-item-txt";
                    return (
                        <View
                            key={item.type}
                            className="tab-item"
                            hoverClass="tab-item-hover"
                            hoverStyle={{
                                backgroundColor: "#F8F8F8"
                            }}
                            onClick={this.tabClick.bind(this, item)}
                        >
                            <Text className={classNameTxt}>{item.title}</Text>
                        </View>
                    );
                })}
            </View>
        );
    };

    tabClick = val => {
        Taro.showLoading({
            title: "加载中"
        });
        this.setState(
            {
                active: val,
                currentPage: 1
            },
            () => {
                this.loadList();
            }
        );
    };

    render() {
        return (
            <View className="list">
                {this.renderTabs()}
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
