import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { StyleSheet, TouchableOpacity } from 'react-native';
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
                <TouchableOpacity style={styles.filterItem} onPress={() => {
                    this.setActive(0);
                }}
                >
                    <Text className='filter-item-txt-active' >默认</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterItem} onPress={() => {
                    this.setActive(0);
                }}
                >
                    <Text className='filter-item-txt' >佣金</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterItem}  onPress={() => {
                    openDrawer()
                }}
                >
                    <Text className='filter-item-txt' >筛选</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingRight: 30
    },
    item: {
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        height: 50,
        paddingLeft: 20
    },
    itemTxt: {
        fontSize: 15,
        color: "#5F5F6B",
    },
    filterItem: {
        alignItems: "center",
        justifyContent: "center",
        width: 81,
        height: 42
    }
});