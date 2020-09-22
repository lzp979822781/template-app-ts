import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { PopUp, Gradient } from "@/components";

import './index.scss';

type pageOwnProps  = {
    visible: boolean,
    onClose?: () => any
}

const rnStyle = {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    height: 344
};

const rnContainerStyle = {
    paddingHorizontal: 0
}

const rnBodyStyle = {
    paddingTop: 0
};

const resetShadow = {
    shadowColor: "#000000",
    shadowOffset: { w: 0, h: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
}

const prefix = 'detail-popup';
const closeSrc = 'https://img10.360buyimg.com/imagetools/jfs/t1/112244/30/18443/459/5f69b004E2b211fa2/ee92aeec83c81fa9.png';

class DetailPopup extends Component<pageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    getInitValue = () => {
    }

    render() {
        const {visible = false, onClose } = this.props;
        return (
            <PopUp
                visible={visible}
                rnStyle={rnStyle}
                rnBodyStyle={rnBodyStyle}
                rnContainerStyle={rnContainerStyle}
            >
                <View className={prefix}>
                    <View className={`${prefix}-header`} >
                        <View className={`${prefix}-header-container`} onClick={onClose}>
                            <Image className={`${prefix}-header-container-img`} src={closeSrc} />
                        </View>
                    </View>
                    <View className={`${prefix}-body`}>
                        <View className={`${prefix}-title`}>
                            <View className={`${prefix}-text-container`}>

                                <View className={`${prefix}-text-container-container`}>

                                    <View className={`${prefix}-text-container-icon`}>
                                        <Text className={`${prefix}-text-container-icon-icon`}>始</Text>
                                    </View>
                                    <Text className={`${prefix}-text-container-icon-text`}>起始日期</Text>
                                </View>

                                <View className={`${prefix}-text-container-content`}>
                                    <Text className={`${prefix}-text-container-text`}>2019.09.28</Text>
                                </View>
                            </View>
                            
                            <View className={`${prefix}-body-delimiter`}>

                            </View>

                            <View className={`${prefix}-time-conatainer`}>
                                <View className={`${prefix}-time-conatainer-title-up`}>
                                    <View className={`${prefix}-time-conatainer-title-up-left`}>
                                        <Text className={`${prefix}-time-conatainer-title-up-left-text`}>末</Text>
                                    </View>
                                    <Text className={`${prefix}-time-conatainer-title-up-right-text`}>结束日期</Text>
                                </View>
                                <View className={`${prefix}-time-conatainer-title-down`}>
                                    <Text className={`${prefix}-time-conatainer-title-down-text`}>2019.09.28</Text>
                                </View>
                            </View>
                        </View>

                        {/* 日期选择器 */}
                        <View>

                        </View>
                    </View>

                    <View className={`${prefix}-btn-container`}>
                        <View className={`${prefix}-btn-reset`} style={resetShadow}>
                            <Text className={`${prefix}-btn-reset-text`}>重置</Text>
                        </View>
                        <Gradient
                            className={`${prefix}-btn-ok`}
                            angle={0}
                            colors={["#F23030", "#FF511D"]}
                        >
                            <Text className={`${prefix}-btn-ok-text`}>确定</Text>
                        </Gradient>
                    </View>
                </View>
            </PopUp>
        );
    }
}

export default DetailPopup;