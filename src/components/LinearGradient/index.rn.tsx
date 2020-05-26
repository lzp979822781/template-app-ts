import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { LinearGradient } from "expo-linear-gradient";

interface ListOption {
    children: any;
}

class YLinearGradient extends Component<ListOption, any> {
    static defaultProps = {
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
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#F2140C", "#ffffff", "#F2140C"]}
                style={this.props.style}
            >
                {this.props.children}
            </LinearGradient>
        );
    }
}

export default YLinearGradient as ComponentClass<PageOwnProps, PageState>;
