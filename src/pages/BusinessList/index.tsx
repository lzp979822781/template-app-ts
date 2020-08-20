import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Text, Image } from "@tarojs/components";
import DataList from "@/components/DataList/index";
import {get, post} from "@/utils/Request";
import "./index.scss";

export default class ListPage extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data: []
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
        const currentPage = this.state.currentPage;
        try {
            const res = await get("api_partnerVender_list", {
                currentPage: currentPage,
                pageSize: 10,
                venderType: null
            });
            
            let listData = this.state.data;
            let data = [];
            if(res.data.data){
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
                title: '加载中',
              })
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

        return data.map(function(item) {
            return (
                <View key={item.venderId} className='list-item-box'>
                    <View className='list-item'>
                        <View className='list-image-box'>
                            <Image
                                className='item-image'
                                src={
                                    `http:${item.shopLogo}` ||
                                "https://taro-ui.jd.com/img/logo-taro.png"
                                }
                            />
                        </View>
                        <View className='content-box'>
                            <View>
                                <Text className='item-title'>
                                    {item.companyName}
                                </Text>
                            </View>
                            <View className='item-dec'>
                                <Text className='item-dec-1'>上架</Text>
                                <Text className='item-dec-3'>
                                    {item.upShelfSkuCount}
                                </Text>
                                <Text className='item-dec-1'>品种</Text>
                                <View className='item-dec-vertical-division'></View>
                                <Text className='item-dec-1'>
                                    起送金额{item.deliveryMoney}元
                                </Text>
                            </View>
                            <View className='item-dec'>
                                <Text className='item-dec-2'>
                                    配送区域：{item.operatingArea}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className='item-dec-division'></View>
                </View>
            );
        });
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
