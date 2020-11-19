import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { StatusBar, Header, Gradient, Drawer } from "@/components/index";
import { StyleSheet, TouchableOpacity, Clipboard, NativeModules } from 'react-native';
import { JDJumping, JDNetworkErrorView, JDSearchInput } from '@jdreact/jdreact-core-lib';
import JDRequest from "@/utils/jd-request";
import { Toast } from "@/utils/model";
import { hoverStyle } from "@/utils/utils";
import Filter from "../Filter/index";
import JDSectionList from "../JDSectionList/index";
import CommonList from "../CommonList/index";
import "./index.scss";

export default class GoodsSelection extends Component<any, any> {
    
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            timeout: 0,
            currentPage: 1,
            pageSize: 20,
            refreshing: false,
            lastPage: false,
            loaded: false,
            shopName: null,
            category: {
                cat1Id: null,
                cat2Id: null,
                cat3Id: null
            },
            keywords: "",
            data: [],
            sections: [],
            statusCode: "1",
            systemInfo: {}
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    componentDidMount() {
        this.getShopData();
        Taro.getSystemInfo({
            success: res => {
                this.setState({
                    systemInfo: res
                })
            }
        });
        NativeModules.JYNativeModule.hideTabbar(true);
    }

    componentWillUnmount() {
        NativeModules.JYNativeModule.hideTabbar(false);
    }

    config: Config = {
        navigationBarTitleText: "",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    commonList: any;
    JDSectionList: any;
    loadList = async () => {
        const { currentPage, pageSize, category, shopName, keywords } = this.state;
        if(currentPage===1){
            this.commonList.goTop();
        };
        const res = await JDRequest.post(
            "mjying_assist_partner_sku_list",
            {
                pageNum: currentPage,
                pageSize: pageSize,
                skuId: null,
                skuName: keywords,
                shopName: shopName,
                venderName: null,
                sortIndex: 0,
                ...category
            }
        );

        if (res.success) {
            this.setVisitListData(res);
        } else {
            this.setState({
                currentPage: currentPage > 1 ? currentPage - 1 : 1,
                refreshing: false,
                timeout: 1
            });
        };
    };

    //获取店铺数据
    getShopData = async () => {
        const { currentPage, pageSize, category, shopName, keywords } = this.state;
        const res = await JDRequest.post("mjying_assist_partner_sku_shop", {
            pageNum: currentPage,
            pageSize: pageSize,
            skuId: null,
            skuName: keywords,
            shopName: shopName,
            venderName: null,
            sortIndex: 0,
            ...category
        }, true);

        if (res.success) {
            const resData = res.data.map((item) => {
                return {
                    title: item.firstChar,
                    data: item.shops
                }
            });

            this.setState({
                sections: resData
            });
        };
    }

    setVisitListData = (res) => {
        let listData = this.state.data;
        let data = [];
        let lastPage = false;
        const { currentPage } = this.state;

        data = res.data.data || [];
        lastPage = res.data.lastPage;

        if (currentPage === 1) {
            listData = data;
        } else {
            listData = listData.concat(data);
        }
        this.setState(
            {
                statusCode: res.code,
                data: listData,
                refreshing: false,
                loaded: true,
                lastPage
            },
            () => {
                if (lastPage) {
                    this.canAction = false;
                } else {
                    setTimeout(() => {
                        this.canAction = true;
                    }, 50);
                };
            }
        );
    };

    onRefresh() {
        this.setState(
            {
                refreshing: true,
                currentPage: 1,
                timeout: 0
            },
            () => {
                this.loadList();
            }
        );
    }

    canAction = false;
    onEndReached() {
        if (this.canAction) {
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

    async copy(key, data) {

        Toast.show("复制成功");

        if (key === "name") {
            Clipboard.setString(data.skuName);
        } else if (key === "href") {
            Clipboard.setString(`https://yao.jd.com/item/${data.skuId}.html`);
        }

        // let str = await Clipboard.getString();
        // console.log(str); //我是文本
    }

    jumpToApp(data) {
        JDJumping.jumpToOpenapp(
            `openApp.jyingApp://virtual?params={"category":"jump","des":"productDetailPage", "params": ${JSON.stringify({ skuId: data.skuId+"" })}}`
        );
    }

    getBonusStr = (item) => {
        if (item.promBonusStr) {
            return item.promBonusStr;
        } else if (item.fixBonusStr) {
            return item.fixBonusStr;
        } else {
            return "--";
        }
    };

    renderItem = ({ item, index }) => {
        const className =
            index === 0 ? "list-item-box top-gap" : "list-item-box";
        return (
            <View className={className} key={item.id}>
                <View className='list-item' hoverStyle={hoverStyle} onClick={() => {
                    this.jumpToApp(item);
                }}
                >
                    <View className='list-image-box'>
                        <Image
                            className='item-image'
                            mode='aspectFit' // 部分支持 scaleToFill, aspectFit, aspectFill, widthFix
                            src={item.mainImg ? `https://img12.360buyimg.com/img/${item.mainImg}` : "https://img14.360buyimg.com/imagetools/jfs/t1/143550/5/8037/22510/5f58ac4fE3ea6f5d3/17d424f4c4437584.png"}
                        />
                    </View>
                    <View className='content-box'>
                        <Text numberOfLines={2} className='item-title'>
                            {item.skuName}
                        </Text>
                        <View className='item-row'>
                            <View className='factory-icon'>
                                <Text className='factory-icon-txt'>厂</Text>
                            </View>
                            <Text
                                numberOfLines={1}
                                className='factory-name'
                            >
                                {item.factoryName || "--"}
                            </Text>
                        </View>
                        <View className='item-row'>
                            <Text className='factory-valid-time'>{item.validTime ? `有效期至 ${item.validTime}` : "暂无有效期"}</Text>
                            <View className='item-row-vertical-line'></View>
                            <View className='factory-medical-spec-con'>
                                <Text
                                    className='factory-medical-spec'
                                    numberOfLines={1}
                                >
                                    {item.medicalSpec || "--"}
                                </Text>
                            </View>
                        </View>
                        <View className='item-row'>
                            <Text className='factory-price-unit'>¥</Text>
                            <Text className='factory-price'>{item.priceStr || "--"}</Text>
                            <Text
                                className='factory-sale30'
                            >
                                {`月销 ${typeof item.sale30 === "number" ? item.sale30 : "--"}`}
                            </Text>
                        </View>
                        <Text className='factory-shop-name'>
                            {item.shopName || "--"}
                        </Text>
                        <View className='item-division'></View>
                        <View className='item-dec'>
                            <View
                                style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}
                            >
                                <Text style={{ fontSize: 11, color: "#333840" }}>佣金</Text>
                                <Text style={{ fontSize: 9, color: "#F2270C", marginLeft: 5 }}>¥</Text>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: "#F2270C",
                                        marginLeft: 2,
                                        marginBottom: -1,
                                    }}
                                >
                                    {this.getBonusStr(item)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <View hoverStopPropagation className='item-dec-btn-1' hoverStyle={hoverStyle} onClick={() => {
                                    this.copy("href", item);
                                }}
                                >
                                    <Text className='item-dec-btn-txt-1'>复制PC链接</Text>
                                </View>
                                <View hoverStopPropagation className='item-dec-btn-2' hoverStyle={hoverStyle} onClick={() => {
                                    this.copy("name", item);
                                }}
                                >
                                    <Gradient
                                        style={{
                                            height: 22,
                                            borderRadius: 11,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                        angle={0}
                                        colors={["#F2140C", "#F2270C", "#F24D0C"]}
                                    >
                                        <Text className='item-dec-btn-txt-2'>复制标题</Text>
                                    </Gradient>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    onChange = activeSections => {
        this.setState({ activeSections });
    };

    onOpenChange = (isOpen) => {
        this.setState({
            show: isOpen
        });
    };

    openDrawer = () => {
        this.setState({
            show: true
        });
    };

    closeDrawer = () => {
        this.setState({
            show: false
        });
    };

    setShop = (shopName) => {
        this.setState(
            {
                shopName,
                show: false,
                // refreshing: true,
                currentPage: 1,
                timeout: 0
            },
            () => {
                this.loadList();
                // this.getShopData();
            }
        );
    }

    renderGotoTop = () => {
        const { showHideGoTop } = this.state;
        if (showHideGoTop) {
            return <View
                className='goto-top'
                onClick={() => {
                    this.commonList.goTop();
                }}
                hoverStyle={hoverStyle}
            >
                <Image
                    className='goto-top-icon'
                    src='https://img12.360buyimg.com/imagetools/jfs/t1/128133/24/18259/8755/5faceaf1E8582a459/7b29f35f7ec23b0e.png'
                />
            </View>
        }

        return null;
    };

    showHideGoTop = (isShow) => {
        this.setState({
            showHideGoTop: isShow
        })
    }

    render() {
        const { lastPage, data, loaded, pageSize, timeout, systemInfo, show, statusCode, refreshing, sections } = this.state;
        if (timeout === 1) {
            return <View className='container'>
                <StatusBar></StatusBar>
                <Header
                    title='推品'
                />
                <JDNetworkErrorView onRetry={this.onRefresh} />
            </View>
        };

        let BtnEle = null;
        const shouBtn = this.state.shouBtn;
        if (shouBtn && this.state.keyword) {
            BtnEle = (
                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => {
                        this.setState(
                            {
                                data: [],
                            },
                            () => {
                                this.loadList();
                                this.getShopData();
                            }
                        );
                    }}
                >
                    <Text style={{ color: "#FFF" }}>搜索</Text>
                </TouchableOpacity>
            );
        } else if (shouBtn && !this.state.keyword) {
            BtnEle = (
                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => {
                        Taro.navigateBack();
                    }}
                >
                    <Text style={{ color: "#FFF" }}>取消</Text>
                </TouchableOpacity>
            );
        }

        return (
            <View className='container'>
                <Drawer
                    show={show}
                    drawerBackgroundColor="rgba(0,0,0,0.5)"
                    onOpenChange={this.onOpenChange}
                    renderSidebar={<JDSectionList showFooter data={sections} onOk={this.setShop} closeDrawer={this.closeDrawer} ref={(sectionList) => this.JDSectionList = sectionList} />}
                >
                    <StatusBar />
                    <Header title='商品搜索' />
                    <View style={styles.searchBody}>
                        <JDSearchInput
                            autoFocus={true}
                            onBlur={() => {
                                this.setState({
                                    shouBtn: false,
                                });
                            }}
                            onFocus={() => {
                                this.setState({
                                    shouBtn: true,
                                });
                            }}
                            style={[styles.searchInput, { marginRight: shouBtn ? 0 : 15 }]}
                            inputStyle={{ backgroundColor: "#fff" }}
                            placeholder='请输入商品名称'
                            onChangeText={(value) => {
                                this.setState({
                                    keyword: value,
                                });
                            }}
                            onSubmitEditing={(ele) => {
                                this.setState(
                                    {
                                        shopName: null,
                                        currentPage: 1,
                                        keywords: ele.nativeEvent.text,
                                    },
                                    () => {
                                        this.JDSectionList.resetState();
                                        this.loadList();
                                        this.getShopData();
                                    }
                                );
                            }}
                        />
                        {BtnEle}
                    </View>
                    <View className='list-box'>
                        <View className='list-box-content'>
                            {loaded ? <Filter openDrawer={this.openDrawer} /> : null}
                            <CommonList
                                loaded={loaded}
                                data={data}
                                refreshing={refreshing}
                                noMoreShow={lastPage && data.length > 0}
                                renderItem={this.renderItem}
                                onEndReached={this.onEndReached}
                                statusCode={statusCode}
                                onRefresh={this.onRefresh}
                                showHideGoTop={this.showHideGoTop}
                                ref={(flatList) => this.commonList = flatList}
                            />
                        </View>
                    </View>
                </Drawer>
                <View style={{ height: 0, width: "100%", position: "relative" }}>
                    {this.renderGotoTop()}
                </View>
            </View>
        );
    }
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    searchBody: {
        flexDirection: "row",
        backgroundColor: "#F23030",
        paddingVertical: 6,
    },
    searchInput: {
        flex: 1,
        marginLeft: 15,
        borderRadius: 16,
        backgroundColor: "#ffffff",
    },
    cancelBtn: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
    }
});
