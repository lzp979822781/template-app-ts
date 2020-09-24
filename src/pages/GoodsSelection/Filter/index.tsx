import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Triangle } from "@/components/index";
import "./index.scss";

type dataObject = {
    [key: string]: any;
};

type baseProps = {
    openDrawer?: any;
    data?: dataObject;
}

const sortStatusList = ["none", "top", "bottom"]

export default class Filter extends Component<baseProps, any> {
    static defaultProps = {
        data: {},
        openDrawer: () => {
            console.log("open")
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            isDefault: false,
            sortStatus: 0, //"none", "top", "bottom"
        }
    }

    setDefault = () => {
        this.setState({
            isDefault: !this.state.isDefault
        });
    }

    setSortStatus() {
        const { sortStatus } = this.state;
        const len = sortStatusList.length-1;
        this.setState({
            sortStatus: sortStatus == len ? 0: sortStatus+1
        });
    }

    render() {
        const { isDefault, sortStatus } = this.state;
        const { openDrawer } = this.props;
        return (
            <View className='filter'>
                <TouchableOpacity style={styles.filterItem} onPress={this.setDefault}>
                    <Text className={isDefault ? 'filter-item-txt-active' : 'filter-item-txt'} >默认</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterItem} onPress={() => {
                    this.setSortStatus();
                }}
                >
                    <Text className='filter-item-txt' >佣金</Text>
                    <Triangle type={sortStatusList[sortStatus]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterItem} onPress={() => {
                    openDrawer()
                }}
                >
                    <Text className='filter-item-txt' >筛选</Text>
                    <Image className='select-icon' src='https://img14.360buyimg.com/imagetools/jfs/t1/121941/9/12230/1491/5f6b1eddEa741b3ad/d99f87eba3540be7.png' />
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 81,
        height: 42
    }
});