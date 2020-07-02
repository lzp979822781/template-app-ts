import Taro, { Component } from '@tarojs/taro';
import { LinearGradient } from "expo-linear-gradient";
import './index.scss';

type PageOwnprops = {
    children?: any,
    colors: Array<string>,
    style?: object,
    onClick?: (param) => void
}

class LinearBadge extends Component<PageOwnprops> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        const { colors, style, onClick } = this.props;
        return (
            <LinearGradient 
                className='gradient-badge'
                style={style}
                colors={colors}
                onClick={onClick}
            >
                {this.props.children}
            </LinearGradient>
        );
    }
}

export default LinearBadge;