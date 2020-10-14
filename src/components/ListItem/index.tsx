import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { hoverStyle } from "@/utils/utils";
import "./index.scss";

interface Option {
    label: string;
    value: string;
    renderValue?: any;
    onClick?: Function
}


export default class ListItem extends Component<Option, any> {
    static defaultProps = {
        label: "标题",
        value: ""
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderValue = () => {
        const { renderValue } = this.props;
        if (renderValue) {
            return renderValue;
        } else {
            return <Text className='list-item-value-txt'>{this.props.value}</Text>
        };
    }
    render() {
        const { onClick } = this.props;
        return (
            <View className='list-item'>
                <View className='list-item-lable'><Text className='list-item-lable-txt'>{this.props.label}</Text></View>
                {onClick ?
                    <View className='list-item-value' hoverStyle={hoverStyle} onClick={onClick}>
                        <View className='list-item-value-con'>
                            {this.renderValue()}
                        </View>
                        <View className='list-item-icon-con'>
                            <Image
                                className='list-item-icon'
                                src='https://img11.360buyimg.com/imagetools/jfs/t1/112898/10/17386/543/5f58ac4dEb76984c6/fd46e9d2b0230023.png'
                            />
                        </View>
                    </View> :
                    <View className='list-item-value'>{this.renderValue()}</View>
                }
            </View>
        );
    }
}
