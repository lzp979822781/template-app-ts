import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { Gradient } from '@/components';
import './index.scss';

const PREFIX = 'sel';

const imgObj = {
    selection: 'https://img13.360buyimg.com/imagetools/jfs/t1/143170/24/15798/586/5fbe012cEbfc27cc7/b4a444db621610a1.png',
}

interface PageOwnProps {
    onSelection: () => any
}

class SelectCondition extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    renderLeft = () => {
        return (
            <View className={`${PREFIX}-left`}>

            </View>
        );
    }

    renderRight = () => {
        const { onSelection } = this.props;
        return (
            <View className={`${PREFIX}-right`} onClick={onSelection}>
                <Text className={`${PREFIX}-right-text`}>筛选</Text>
                <Image className={`${PREFIX}-right-img`} src={imgObj.selection} />
            </View>
        );
    }

    renderMiddle = () => {
        return (
            <Gradient
                angle={0}
                colors={["rgba(216,216,216,0)", "rgba(238,238,238,.5)" ]}
                className={`${PREFIX}-middle`}
            >

            </Gradient>
        );
    }


    render() {
        return (
            <View className={`${PREFIX}`}>
                { this.renderLeft()}
                { this.renderMiddle()}
                { this.renderRight()}
            </View>
        );
    }
}

export default SelectCondition;