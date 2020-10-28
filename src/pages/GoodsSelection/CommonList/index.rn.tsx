/* eslint-disable @typescript-eslint/no-use-before-define */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { JDJumping } from "@jdreact/jdreact-core-lib";
import { FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Gradient } from "@/components/index";
import { Loading, Toast } from "@/utils/model";
import JDRequest from "@/utils/jd-request";
import "./index.scss";

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

type baseProps = {
    data: ReadonlyStringArray;
}

export default class CommonList extends Component<baseProps, any> {
    static defaultProps = {
        loaded: false,
        data: [],
        refreshing: false,
        noMoreShow: true,
        statusCode: "1",
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
        this.state = {
        }
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

    submitOrder = async () => {
        Taro.showLoading({
            title: "加载中"
        });

        const res = await JDRequest.get(
            "/assist/partner/yearFee/submitOrder"
        );

        Taro.hideLoading();
        if (res.success) {
            const data = encodeURIComponent(res.data);

            JDJumping.jumpToOpenapp(
                `openApp.jyingApp://virtual?params={"category":"jump","des":"paymentPage","payUrl": "${data}"}`
            )
                .then(() => {
                    setTimeout(() => {
                        Taro.showToast({
                            title: "支付成功",
                            icon: 'none',
                            duration: 1500
                        });
                        this.props.onRefresh();
                    }, 500);
                })
                .catch((error) => {
                    setTimeout(() => {
                        if (error && error.message) {
                            Taro.showToast({
                                title: error.message,
                                icon: 'none',
                                duration: 1500
                            });
                        }

                        this.props.onRefresh();
                    }, 500);
                });
        } else {
            Taro.showToast({
                title: res.errorMsg,
                icon: 'none',
                duration: 1500
            });
        };
    };

    ListEmptyComponent = () => {
        if (!this.props.loaded) {
            return null;
        };
        const typeList = [
            {
                icon: "https://img14.360buyimg.com/imagetools/jfs/t1/144044/8/9665/234858/5f742b77E1ebb36b2/40f271b982f31898.png",
                bigTxt: "暂无相关商品",
                txt: "",
            },
            {
                icon: "https://img12.360buyimg.com/imagetools/jfs/t1/113887/29/18725/236564/5f742b96Eb5135720/d12928b443e3ce03.png",
                bigTxt: "您的合作已终止",
                txt: "联系运营 010-0900-9878",
            },
            {
                icon: "https://img13.360buyimg.com/imagetools/jfs/t1/144118/13/9825/224751/5f742bb1E0fff5fe4/b9b2051514fd7c46.png",
                bigTxt: "你还未认证通过",
                txt: "无法查看商品/客户"
            },
            {
                icon: "https://img14.360buyimg.com/imagetools/jfs/t1/150713/36/1959/187143/5f742bc5E8ed3adf8/d2f7ad171f117c25.png",
                bigTxt: "您还未缴费/缴费已过期",
                txt: "无法查看商品/客户",
                btnTxt: "去缴费",
                fn: () => {
                    this.isPress = true;
                    this.submitOrder();
                },
            },
        ];
        const statusCode = this.props.statusCode; //this.props.statusCode; // "-10002" ; //
        let data = typeList[0];
        if (statusCode === "1") {
            data = typeList[0];
        } else if (statusCode === "-10001") {
            data = typeList[1];
        } else if (statusCode === "-10002") {
            data = typeList[2];
        } else if (statusCode === "-10003") {
            data = typeList[3];
        }

        if (!this.props.refreshing) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image style={{ height: 150, width: 150 }} src={data.icon} />
                    <Text
                        style={{
                            fontWeight: "bold",
                            marginTop: 15,
                            color: "#2E2D2D",
                            fontSize: 16,
                        }}
                    >
                        {data.bigTxt}
                    </Text>
                    <Text style={{ marginTop: 10, color: "#BFBFBF", fontSize: 12 }}>
                        {data.txt}
                    </Text>
                    {data.fn ? (
                        <TouchableOpacity
                            style={{
                                marginTop: 18,
                                width: 150,
                                height: 31,
                                borderRadius: 11,
                            }}
                            onPress={data.fn}
                        >
                            <Gradient
                                angle={0}
                                colors={["#F2140C", "#F2270C", "#F24D0C"]}
                                style={{
                                    width: 150,
                                    height: 31,
                                    borderRadius: 15,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ fontSize: 12, color: "#FFFFFF" }}>
                                    {data.btnTxt}
                                </Text>
                            </Gradient>
                        </TouchableOpacity>
                    ) : null}
                </View>
            );
        }

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
    };

};