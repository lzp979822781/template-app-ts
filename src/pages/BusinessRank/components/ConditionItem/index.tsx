import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import classnames from 'classnames';

import './index.scss';

const PREFIX = 'condition-item';

const imgObj = {
    normalUp: '',
    selectUp: '',
    normalDown: '',
    selectDown: ''
};

interface Item {
    label: string,
    selected?: string | undefined
}

interface PageOwnProps {
    data: Item,
    onUpClick: () => any,
    onDownClick: () => any,
    onTextClick: () => any,
    style?: any
}

class ConditionItem extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    renderIcon = () => {
        const { data: { selected }, onUpClick, onDownClick} = this.props;

        return (
            <View className={`${PREFIX}-icon`}>
                <View className={`${PREFIX}-icon-up`} onClick={onUpClick}>
                    <Image className={`${PREFIX}-icon-common`} src={imgObj[ selected === 'up' ? 'selectUp': 'normalUp']} />
                </View>
                <View className={`${PREFIX}-icon-down`} onClick={onDownClick}>
                    <Image className={`${PREFIX}-icon-common`} src={imgObj[selected === 'down' ? 'selectDown': 'normalDown']} />
                </View>
            </View>
        )
    }

    render() {
        const { data: { label, selected }, style, onTextClick } = this.props;

        const textCls = classnames(`${PREFIX}-title-text`, {
            [`${PREFIX}-title-text-selected`]: typeof selected !== 'undefined'
        })
        return (
            <View className={`${PREFIX}`} style={style}>
                <View className={`${PREFIX}-title`} onClick={onTextClick}>
                    <Text className={textCls}>{label || '--'}</Text>
                </View>
                
                { this.renderIcon()}
            </View>
        );
    }
}

export default ConditionItem;