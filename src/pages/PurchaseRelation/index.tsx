import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { StatusBar, Header, CommonList } from "@/components/index";
import { JDNetworkErrorView } from '@jdreact/jdreact-core-lib';
import JDRequest from "@/utils/jd-request.bak";
import "./index.scss";

export default class PurchaseRelation extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            timeout: 0,
            currentPage: 1,
            pageSize: 20,
            refreshing: false,
            lastPage: false,
            loaded: false,
            data: [
                // {
                //     relationId: 1,
                //     shopName: "成都市沙溪镇悦心康大药房成都市沙溪镇悦心康",
                //     auditTime: "2020-05-22 16:40:49",
                //     shopLogo: ""
                // }
            ],
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    componentWillMount() {
        this.loadList();
    }

    config: Config = {
        navigationBarTitleText: "",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    loadList = async () => {
        const params = this.$router.params;

        // if (!this.state.refreshing) {
        //     Taro.showLoading({
        //         title: "加载中"
        //     });
        // };


        const { currentPage, pageSize } = this.state;
        const res = await JDRequest.post(
            "mjying_assist_buyer_relation_queryPage",
            {
                pin: params.pin,
                pageNum: currentPage,
                pageSize: pageSize
            }
        );
        // Taro.hideLoading();
        if (res.success) {
            this.setVisitListData(res);
        } else {
            Taro.showToast({
                title: res.errorMsg,
                icon: 'none',
                duration: 1500
            });
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
            // Taro.showLoading({
            //     title: "加载中"
            // });
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

    renderItem({ item, index }) {
        const className =
            index === 0 ? "list-item-box top-gap" : "list-item-box";
        return (
            <View key={item.relationId} className={className}>
                <View className='list-item'>
                    <View className='list-image-box'>
                        <Image
                            className='item-image'
                            mode='aspectFit'
                            src={item.shopLogo ? "https:" + item.shopLogo : "https://img14.360buyimg.com/imagetools/jfs/t1/143550/5/8037/22510/5f58ac4fE3ea6f5d3/17d424f4c4437584.png"}
                        />
                    </View>
                    <View className='content-box'>
                        <Text numberOfLines={2} className='item-title'>
                            {item.shopName}
                        </Text>
                    </View>
                </View>
                <View className='item-division'></View>
                <View className='item-dec'>
                    <Image className='item-dec-icon' src='https://img12.360buyimg.com/imagetools/jfs/t1/121527/2/12047/1394/5f58ac4dE84b296d4/47ce73fa447d387e.png' />
                    <Text className='item-dec-txt'>
                        建采时间：{item.auditTime}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        const { lastPage, data, loaded, refreshing, timeout } = this.state;
        if (timeout === 1) {
            return <View className='container'>
                <StatusBar></StatusBar>
                <Header
                    title='建采关系'
                />
                <JDNetworkErrorView onRetry={this.onRefresh} />
            </View>
        };


        return (
            <View className='container'>
                <StatusBar />
                <Header title='建采关系' />
                <CommonList
                    loaded={loaded}
                    data={data}
                    refreshing={refreshing}
                    noMoreShow={lastPage && data.length > 0}
                    renderItem={this.renderItem}
                    onEndReached={this.onEndReached}
                    onRefresh={this.onRefresh}
                />
            </View>
        );
    }
}
