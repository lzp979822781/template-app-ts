import Taro, { Component } from '@tarojs/taro';
import { LinearGradient } from "expo-linear-gradient";
import './index.scss';

type PageOwnprops = {
    children?: any,
    colors: Array<string>,
    style?: object
}

class LinearBadge extends Component<PageOwnprops> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        const { colors, style } = this.props;
        return (
            <LinearGradient 
                className='gradient-badge'
                style={style}
                colors={colors}
            >
                {this.props.children}
            </LinearGradient>
        );
    }
}

export default LinearBadge;