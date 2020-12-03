import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import './index.scss';

const PREFIX = 'sel';

const imgObj = {
    selection: 'https://img11.360buyimg.com/imagetools/jfs/t1/143577/37/16435/630/5fc48d70Ebf52f1c5/59f2ed985534f579.png',
}

interface PageOwnProps {
    total: number | undefined,
    onSelection: () => any
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PageOwnState {}

class SelectCondition extends Component<PageOwnProps, PageOwnState> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderLeft = () => {
        const { total = '--' } = this.props;
        return (
            <View className={`${PREFIX}-left`}>
                <Text className={`${PREFIX}-left-text`}>{`共${total}条`}</Text>
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



    render() {
        return (
            <View className={`${PREFIX}`}>
                { this.renderLeft()}
                { this.renderRight()}
            </View>
        );
    }
}

export default SelectCondition;