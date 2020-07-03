import Taro, { Component } from "@tarojs/taro";
import { LinearGradient } from "expo-linear-gradient";
import "./index.scss";

type PageOwnprops = {
    children?: any;
    colors: Array<string>;
    style?: object;
    angle?: number;
    onClick?: (param) => void;
};

class LinearBadge extends Component<PageOwnprops> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { colors, style, onClick, angle = 90 } = this.props;
        const startX = 0,
            startY = 0;
        let endX, endY;

        if (angle < 45) {
            endX = 1;
            endY = Math.tan((Math.PI / 180) * angle);
        } else {
            endX = Math.tan((Math.PI / 180) * (90-angle));
            endY = 1;
        }
        return (
            <LinearGradient
                className='gradient-badge'
                style={style}
                colors={colors}
                onClick={onClick}
                start={{ x: startX, y: startY }}
                end={{ x: endX, y: endY }}
            >
                {this.props.children}
            </LinearGradient>
        );
    }
}

export default LinearBadge;
