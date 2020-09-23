import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import "./index.scss";

type dataObject = {
    [key: string]: any;
};

type baseProps = {
    data?: dataObject;
}

export default class Accordion extends Component<baseProps, any> {
    static defaultProps = {
        data: {}
    }
    constructor(props) {
        super(props);
        this.state = {
            expand: 0,
            active: 0
        }
    }

    setExpand(index) {
        this.setState({
            expand: index
        })
    }

    setActive(index) {
        this.setState({
            active: index
        })
    }

    render() {
        const { expand, active } = this.state;
        return (
            <View className='accordion'>
                <View className='accordion-header' onClick={() => {
                    this.setExpand(0);
                }}
                >
                    <Text className='accordion-header-txt' >药品</Text>
                    <Image
                        className='accordion-header-icon'
                        src='https://img11.360buyimg.com/imagetools/jfs/t1/112898/10/17386/543/5f58ac4dEb76984c6/fd46e9d2b0230023.png'
                    />
                </View>
                <View className='accordion-body'>
                    <View className='accordion-item' onClick={() => {
                        this.setActive(0);
                    }}
                    >
                        <View
                            className='accordion-item-icon-active'
                        />
                        <Text className='accordion-item-txt' >化学药品</Text>
                    </View>
                    <View className='accordion-item' onClick={() => {
                        this.setActive(1);
                    }}
                    >
                        <View
                            className='accordion-item-icon'
                        />
                        <Text className='accordion-item-txt' >中成药</Text>
                    </View>
                    <View className='accordion-item' onClick={() => {
                        this.setActive(2);
                    }}
                    >
                        <View
                            className='accordion-item-icon'
                        />
                        <Text className='accordion-item-txt' >中药材</Text>
                    </View>
                </View>
                <View className='accordion-header' onClick={() => {
                    this.setExpand(0);
                }}
                >
                    <Text className='accordion-header-txt' >食品</Text>
                </View>
            </View>
        );
    }
}
