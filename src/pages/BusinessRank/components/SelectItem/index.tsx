import Taro, { Component } from "@tarojs/taro";
import classnames from 'classnames';
import { View, Text } from "@tarojs/components";
import './index.scss';

const PREFIX = `select-item`;
interface PageOwnProps {
    data: { label: string|number|undefined, value?: string|number|undefined, selected: boolean|undefined}
    style?: any,
    onClick?: () => any
}

class SelectItem extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    onItemClick = () => {

    }

    render() {
        const { data: { label, selected } } = this.props;
        const itemCls = classnames(`${PREFIX}`, {
            [`${PREFIX}-selected`]: selected
        });

        const textCls = classnames(`${PREFIX}-text`, {
            [`${PREFIX}-text-selected`]: selected
        })

        const { style = {}, onClick } = this.props;
        return (
            <View className={itemCls} onClick={onClick || this.onItemClick} style={style}>
                <Text className={textCls}>{`${label || '--'}`}</Text>
            </View>
        );
    }
}

export default SelectItem;