import Taro, { Component, Config } from "@tarojs/taro";
import { ScrollView, Block, View, Text, Image } from "@tarojs/components";
import { StatusBar, Header, Modal, JDListItem} from "@/components/index";
import { hoverStyle } from "@/utils/utils";
import JDRequest from "@/utils/jd-request";
import TagAlertBtn from "@/assets/images/tag-alert-btn@3x.png";
import TagModelClose from "@/assets/images/tag-model-close@3x.png";
import ModelHeadIcon from "@/assets/images/customer-tag-model-title-icon@3x.png";
import TagModelTitleIcon from "@/assets/images/tag-model-title-icon@3x.png";

import "./index.scss";

export default class Goods extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            tagsData: {
                1: [],
                2: [],
                3: []
            },
            tagsExplanation: []
        };
    }

    config: Config = {
        navigationBarTitleText: "",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    componentDidShow() {
        this.getTags();
        this.getTagsExplanation();
    }

    getTags = async () => {
        //客户标签
        Taro.showLoading({
            title: "加载中"
        });
        
        const params = this.$router.params;
        const resTags = await JDRequest.get("mjying_assist_customer_getTags", {
            pin: params.pin
        });

        if (resTags.success) {
            this.setState({ tagsData: resTags.data })
        };

        Taro.hideLoading();
    };


    getTagsExplanation = async () => {
        //客户标签注释
        const resTagsExplanation = await JDRequest.get("mjying_assist_customer_getTagExplanation");
        if (resTagsExplanation.success) {
            this.setState({ tagsExplanation: resTagsExplanation.data })
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


    renderContent = () => {
        const { tagsExplanation } = this.state;

        const tagsExplanationList = tagsExplanation.map((item) => {
            return <View key={item.key} className='model-body-list-item'>
                <View className='model-body-title'>
                    <Image
                        className='model-body-title-icon'
                        src={TagModelTitleIcon}
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
                        <Image className='tag-close-icon' src={TagModelClose} />
                    </View>
                </View>
                <View className='model-head'>
                    <Image className='model-head-icon' src={ModelHeadIcon} />
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

        const nodeList = tagsData["1"].map((item, index) => {
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
        const listData = tagsData["2"].filter((item) => {
            return !!item.value;
        })
        const nodeList = listData.map((item) => {
            return <JDListItem
                key={item.key}
                label={item.title}
                value={item.value || "--"}
            />
        })

        return <View className='card-operation'>
            {nodeList}
        </View>
    }

    renderGroup3 = () => {
        const { tagsData } = this.state;
        const listData = tagsData["3"].filter((item) => {
            return !!item.value;
        });

        const nodeList = listData.map((item) => {
            return <JDListItem
                key={item.key}
                label={item.title}
                value={item.value || "--"}
            />
        })
        return <View className='card-operation'>
            {nodeList}
        </View>
    }

    render() {
        const { visible } = this.state;
        return (
            <View className='container'>
                <StatusBar />
                <Header
                    title='客户标签'
                    renderRight={
                        <View
                            className='tag-head-right'
                            onClick={this.onOpenModal}
                            hoverStyle={hoverStyle}
                        >
                            <Image
                                className='head-right-btn'
                                src={TagAlertBtn}
                            />
                        </View>
                    }
                />

                <ScrollView>
                    <View className='tag-banner-bg'></View>
                    {this.renderGroup1()}
                    {this.renderGroup2()}
                    {this.renderGroup3()}
                </ScrollView>
                <Modal
                    visible={visible}
                    className='test-modal'
                    onCancel={this.onClose}
                    onConfirm={this.onConfirm}
                    bodyStyle={{ height: 410 }}
                    renderContent={this.renderContent()}
                    customFooter
                    customHeader
                />
            </View>
        );
    }
}
