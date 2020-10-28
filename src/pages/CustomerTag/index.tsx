import Taro, { Component, Config } from "@tarojs/taro";
import { ScrollView, Block, View, Text, Image } from "@tarojs/components";
import { StatusBar, Header, JDModal, JDListItem } from "@/components/index";
// import { Platform } from 'react-native';
import { get as getGlobalData } from '@/utils/global_data';
import { JDNetworkErrorView, JDJumping } from '@jdreact/jdreact-core-lib';
import { hoverStyle } from "@/utils/utils";
import JDRequest from "@/utils/jd-request";

import "./index.scss";

export default class Goods extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            timeout: 0,
            visible: false,
            loaded: false,
            tagsData: {
                "1": [],
                "2": [],
                "3": []
            },
            tagsExplanation: []
        };
    }

    componentWillMount() {
        this.getTags(0);
        this.getTagsExplanation();
    }

    componentDidShow() {
        const { loaded } = this.state;
        if (loaded) {
            this.getTags(1);
        };
    }

    config: Config = {
        navigationBarTitleText: "",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    updata = () => {
        this.setState({
            timeout: 0
        }, () => {
            this.getTags(0);
            this.getTagsExplanation();
        });
    };

    getTags = async (isUpdate) => {
        //客户标签
        if (!isUpdate) {
            Taro.showLoading({
                title: "加载中"
            });
        }

        const params = this.$router.params;
        // 新接口：mjying_assist_tag_customertag  老接口：mjying_assist_customer_getTags
        const resTags = await JDRequest.get("mjying_assist_tag_customertag", {
            pin: params.pin
        });

        Taro.hideLoading();
        if (resTags.success) {
            this.setState({ tagsData: resTags.data, loaded: true })
        } else {
            Taro.showToast({
                title: resTags.errorMsg,
                icon: 'none',
                duration: 1500
            });
            this.setState({ timeout: 1, loaded: true })
        };
    };

    getTagsExplanation = async () => {
        //客户标签注释
        const resTagsExplanation = await JDRequest.get("mjying_assist_customer_getTagExplanation");
        if (resTagsExplanation.success) {
            this.setState({ tagsExplanation: resTagsExplanation.data })
        } else {
            this.setState({ timeout: 1 })
        }
    };

    onOpenModal = () => {
        this.setState({ visible: true });
    };

    onClose = () => {
        this.setState({ visible: false });
    };

    onConfirm = () => {
        this.onClose();
    };

    jumpToAppWeb(key) {
        const params = this.$router.params;
        JDJumping.jumpToOpenapp(`openApp.jyingApp://virtual?params={"category":"jump","des":"webView", "params": ${JSON.stringify({ url: encodeURIComponent(`http://yao.m.jd.com/jy/#/tags/configure?pin=${encodeURIComponent(params.pin)}&target=${key}`) })}}`)
    }

    renderContent = () => {
        const { tagsExplanation } = this.state;
        const tagsExplanationList = tagsExplanation.map((item) => {
            return <View key={item.title} className='model-body-list-item'>
                <View className='model-body-title'>
                    <Image
                        className='model-body-title-icon'
                        src='https://img10.360buyimg.com/imagetools/jfs/t1/131683/25/9474/351/5f58ac4fE48c6db20/6230d2853be308e9.png'
                    />
                    <Text className='model-body-title-txt'>{item.title}</Text>
                </View>
                <Text className='model-body-des'>{item.desc}</Text>
            </View>
        });

        return (
            <View className='tag-model'>
                <View className='tag-model-close'>
                    <View className='tag-close-icon-con' onClick={this.onClose}>
                        <Image className='tag-close-icon' src='https://img11.360buyimg.com/imagetools/jfs/t1/140989/12/8055/459/5f58ac4fE8aa0f2c7/8121a8647fb70c46.png' />
                    </View>
                </View>
                <View className='model-head'>
                    <Image className='model-head-icon' src='https://img11.360buyimg.com/imagetools/jfs/t1/126146/3/12024/85189/5f58ac4eE785272fa/18e598c61a2cff20.png' />
                    <Text className='model-head-title'>标签说明</Text>
                </View>
                <View className='model-body'>
                    {tagsExplanationList}
                </View>
            </View>
        );
    };

    renderGroup1 = () => {
        const { tagsData } = this.state;
        const Shadow = {
            shadowColor: "#f5f5f5",
            shadowOffset: { w: 10, h: 2 },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 2
        };

        const dataList = tagsData && tagsData["1"] ? tagsData["1"] : [];

        const nodeList = dataList.map((item, index) => {
            return <Block key={item.key}><View className='card-base-item'>
                <Text className='card-base-item-label'>{item.title}</Text>
                <Text className={item.value ? 'card-base-item-value' : "card-base-item-value1"}>{item.value || "暂无"}</Text>
            </View>
                {index === tagsData["1"].length - 1 ? null : <View className='tag-divide-line'></View>}
            </Block>
        });

        return <View className='card-base' style={Shadow}>
            {nodeList}
        </View>
    }

    renderGroup2 = () => {
        const { tagsData } = this.state;

        const dataList = tagsData && tagsData["2"] ? tagsData["2"] :  [];
        const nodeList = dataList.map((item) => {
            if (item.key === "repurchaseCycle") {
                return <JDListItem
                    key={item.key}
                    label={item.title}
                    renderValue={<View className='list-item-value-con'><Text className='list-item-value-txt'>{item.value || "暂无"}</Text><Text className='list-item-value-desc'>（平均值）</Text></View>}
                />
            }
            return <JDListItem
                key={item.key}
                label={item.title}
                value={item.value || "暂无"}
            />
        })

        return <View className='card-operation'>
            {nodeList}
        </View>
    }

    renderGroup3 = () => {

        const jyNativeData = getGlobalData('jyNativeData');
        const isSaint = jyNativeData.userType === "CM";

        const { tagsData } = this.state;
        // const listData = tagsData["3"].filter((item) => {
        //     return !!item.value;
        // });

        const dataList = tagsData && tagsData["3"] ? tagsData["3"] : [];
        const nodeList = dataList.map((item) => {
            // if (item.key === "avg_repurchase") {
            //     return <JDListItem
            //         key={item.key}
            //         label={item.title}
            //         onClick={() => { this.jumpToAppWeb(item.key) }}
            //         renderValue={<View className='list-item-value-con'><Text className='list-item-value-txt'>{item.value || "暂无"}</Text><Text className='list-item-value-desc'>（平均值）</Text></View>}
            //     />
            // }
            if (isSaint) {
                return <JDListItem
                    key={item.key}
                    label={item.title}
                    onClick={() => { this.jumpToAppWeb(item.key) }}
                    value={item.value || "暂无"}
                />
            } else {
                return <JDListItem
                    key={item.key}
                    label={item.title}
                    value={item.value || "暂无"}
                />
            }

        })
        return <View className='card-operation'>
            {nodeList}
        </View>
    }

    render() {
        const { visible, timeout } = this.state;

        if (timeout === 1) {
            return <View className='container'>
                <StatusBar></StatusBar>
                <Header
                    title='客户标签'
                />
                <JDNetworkErrorView onRetry={this.updata} />
            </View>
        };

        return (
            <View className='container'>
                <StatusBar />
                <Header
                    title='客户标签'
                    renderRight={
                        <View
                            className='tag-head-right'
                        >
                            <View
                                className='head-right-btn-con'
                                onClick={this.onOpenModal}
                                hoverStyle={hoverStyle}
                            >
                                <Image
                                    className='head-right-btn'
                                    src='https://img13.360buyimg.com/imagetools/jfs/t1/132600/8/9621/3231/5f58ac4fEe8dd77a3/2900a31cea1a2d1f.png'
                                />
                            </View>
                        </View>
                    }
                />

                <ScrollView>
                    <View className='tag-banner-bg'></View>
                    {this.renderGroup1()}
                    {this.renderGroup2()}
                    {this.renderGroup3()}
                    <View style={{ height: 50 }}></View>
                </ScrollView>
                <JDModal
                    visible={visible}
                    className='test-modal'
                    onCancel={this.onClose}
                    onConfirm={this.onConfirm}
                    // eslint-disable-next-line taro/render-props
                    renderContent={this.renderContent()}
                    customFooter
                    customHeader
                />
            </View>
        );
    }
}
