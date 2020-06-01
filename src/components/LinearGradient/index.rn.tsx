import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { LinearGradient } from "expo-linear-gradient";

interface ListOption {
    direction: "row" | "column";
    children: any;
}

class YLinearGradient extends Component<ListOption, any> {
    static defaultProps = {
        colors: ["#F2140C", "#ffffff"],
        height: 40,
        rnStyle:{
            justifyContent: "center",
            alignItems: "center"
        },
        direction: "column",
        children: (
            <View
                style={{
                    backgroundColor: "transparent",
                    fontSize: 15,
                    color: "#fff",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text>渐变</Text>
            </View>
        )
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        const { direction, colors, height } = this.props;
        let startX, startY, endX, endY;
        if(direction==="row"){
            startX = 0; 
            startY = 0;
            endX = 1;
            endY = 1;
        }else{
            startX = 0; 
            startY = 0;
            endX = 0;
            endY = 1;
        }
        
        return (
            <LinearGradient
                start={{ x: startX, y: startY }}
                end={{ x: endX, y: endY }}
                colors={colors}
                style={{...this.props.rnStyle, height: height}}
            >
                {this.props.children}
            </LinearGradient>
        );
    }
}

export default YLinearGradient as ComponentClass<PageOwnProps, PageState>;
