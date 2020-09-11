import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { hoverStyle } from "@/utils/utils";
import "./index.scss";

type baseProps = {
    onPopupShow: any;
}

export default class DistBtn extends Component<baseProps, any> {
    constructor(props) {
        super(props);
    }


    render() {
        const { onPopupShow } = this.props;
        return (
            <View
                className='customer-head-right'
            >
                <View
                    className='head-right-btn-con'
                    onClick={onPopupShow}
                    hoverStyle={hoverStyle}
                >
                    <Image
                        className='head-right-btn'
                        src='https://img11.360buyimg.com/imagetools/jfs/t1/112573/14/17669/800/5f5a1513E402fed84/37fcf5d8c360e8be.png'
                    />
                </View>
            </View>
        );
    }
}
