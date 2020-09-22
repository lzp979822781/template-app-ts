import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { PopUp } from "@/components";

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

const rnBodyStyle = {
    paddingTop: 0
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
            >
                <View className={prefix}>
                    <View className={`${prefix}-header`} >
                        <View className={`${prefix}-header-container`} onClick={onClose}>
                            <Image className={`${prefix}-header-container-img`} src={closeSrc} />
                        </View>
                    </View>
                </View>
            </PopUp>
        );
    }
}

export default DetailPopup;