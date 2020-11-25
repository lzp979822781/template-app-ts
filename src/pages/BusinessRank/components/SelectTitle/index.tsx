import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import './index.scss';

const PREFIX = 'sel-title';

interface PageOwnProps {
    title: string|undefined,
    style?: any,
    renderRight?: () => any
}
class SelectTitle extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { style, title, renderRight } = this.props;
        return (
            <View className={`${PREFIX}`} style={style}>
                <View className={`${PREFIX}-left`}>
                    <Text className={`${PREFIX}-left-text`}>{title}</Text>
                </View>
                <View className={`${PREFIX}-right`}>
                    { renderRight && renderRight()}
                </View>
            </View>  
        );
    }
}

export default SelectTitle;