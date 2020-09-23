import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import "./index.scss";

type dataObject = {
    [key: string]: any;
};

type baseProps = {
    openDrawer?: any;
    data?: dataObject;
}

export default class Filter extends Component<baseProps, any> {
    static defaultProps = {
        data: {},
        openDrawer: ()=>{
            console.log("open")
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            direction: 0
        }
    }

    setDirection(index) {
        this.setState({
            direction: index
        })
    }

    setActive(index) {
        this.setState({
            active: index
        })
    }

    render() {
        const { direction, active } = this.state;
        const {openDrawer} = this.props;
        return (
            <View className='filter'>
                <View className='filter-item' onClick={() => {
                    this.setActive(0);
                }}
                >
                    <Text className='filter-item-txt-active' >默认</Text>
                </View>
                <View className='filter-item' onClick={() => {
                    this.setActive(0);
                }}
                >
                    <Text className='filter-item-txt' >佣金</Text>
                </View>
                <View className='filter-item' onClick={() => {
                    openDrawer()
                }}
                >
                    <Text className='filter-item-txt' >筛选</Text>
                </View>
            </View>
        );
    }
}
