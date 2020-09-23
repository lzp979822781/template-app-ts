import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Text, Image } from "@tarojs/components";
import { StatusBar, Header, DataList, Gradient, Drawer } from "@/components/index";
import { JDNetworkErrorView } from '@jdreact/jdreact-core-lib';
import JDRequest from "@/utils/jd-request";
import Accordion from "./Accordion/index";
import Filter from "./Filter/index";
// import FilterDrawer from "./FilterDrawer/index";
import JDSectionList from "./JDSectionList/index";
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
            data: [
                {
                    id: 1,
                    skuName: "华北制阿莫西林克拉维酸钾干混悬剂药 10粒50g一疗…",
                    factoryName: "华北制药医药股份有限公司",
                    validTime: "2020-05-22",
                    medicalSpec: "2盒10000",
                    priceStr: "399",
                    sale30: "月销248",
                    shopName: "北京京东佳康旗舰店",
                    shopLogo: ""
                },
                {
                    id: 2,
                    skuName: "华北制阿莫西林克拉维酸钾干混悬剂药 10粒50g一疗…",
                    factoryName: "华北制药医药股份有限公司",
                    validTime: "2020-05-22",
                    medicalSpec: "2盒10000",
                    priceStr: "399",
                    sale30: "月销248",
                    shopName: "北京京东佳康旗舰店",
                    shopLogo: ""
                }
            ],
            systemInfo: {}
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    componentWillMount() {
        // this.loadList();
        Taro.getSystemInfo({
            success: res => {
                this.setState({
                    systemInfo: res
                })
            }
        });
    }

    config: Config = {
        navigationBarTitleText: "",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    loadList = async () => {
        const params = this.$router.params;

        if (!this.state.refreshing) {
            Taro.showLoading({
                title: "加载中"
            });
        };


        const { currentPage, pageSize } = this.state;
        const res = await JDRequest.post(
            "mjying_assist_buyer_relation_queryPage",
            {
                pin: params.pin,
                pageNum: currentPage,
                pageSize: pageSize
            }
        );
        Taro.hideLoading();
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
                data: listData,
                refreshing: false,
                loaded: true,
                lastPage
            },
            () => {
                if (data.length < this.state.pageSize) {
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
        const { data = [] } = this.state;
        return data.map((item) => {
            const className = "list-item-box";
            return (
                <View key={item.id} className={className}>
                    <View className='list-item'>
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
                                <Text className='factory-valid-time'> {`有效期至 ${item.validTime || "--"}`}</Text>
                                <View className='item-row-vertical-line'></View>
                                <Text
                                    className='factory-medical-spec'
                                >
                                    {item.medicalSpec || "--"}
                                </Text>
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
                            <View className='item-dec'>
                                <View className='item-dec-btn-1'>
                                    <Text className='item-dec-btn-txt-1'>复制PC链接</Text>
                                </View>
                                <View className='item-dec-btn-2'>
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
                    <View className='item-division'></View>
                </View>
            );
        });
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


    render() {
        const { lastPage, data, loaded, pageSize, timeout, systemInfo, show } = this.state;
        if (timeout === 1) {
            return <View className='container'>
                <StatusBar></StatusBar>
                <Header
                    title='推品'
                />
                <JDNetworkErrorView onRetry={this.onRefresh} />
            </View>
        };

        const noneDataHeight = systemInfo.windowHeight ? systemInfo.windowHeight - systemInfo.statusBarHeight - 94 : "auto";

        return (
            <View className='container'>
                <Drawer
                    show={show}
                    drawerBackgroundColor="rgba(0,0,0,0.5)"
                    onOpenChange={this.onOpenChange}
                    renderSidebar={<JDSectionList />}
                >
                    <StatusBar />
                    <Header title='推品' />
                    <View className='list-box'>
                        <View className='list-box-menus'>
                            <Accordion></Accordion>
                        </View>
                        <View className='list-box-content'>
                            <Filter openDrawer={this.openDrawer} />
                            <DataList
                                minusHeight={0}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                                onEndReached={this.onEndReached}
                            >
                                {
                                    data.length === 0 && loaded ?
                                        <View style={{ height: noneDataHeight }} className='item-image-none'>
                                            <Image
                                                className='item-image-none-icon'
                                                src='https://img12.360buyimg.com/imagetools/jfs/t1/121246/7/12582/29481/5f5f49cdE3b123199/8cb12f08a4713104.png'
                                            />
                                            <Text className='item-image-none-txt' >暂无数据</Text>
                                        </View> :
                                        <Block>{this.renderItems()}</Block>
                                }
                                {lastPage && data.length >= pageSize ? <Text className='purchaseRelation-list-none' >没有更多数据了</Text> : null}
                            </DataList>
                        </View>
                    </View>
                </Drawer>
            </View>
        );
    }
}
