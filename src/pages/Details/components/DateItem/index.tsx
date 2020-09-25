import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import classnames from 'classnames';
import './index.scss';

const prefix = 'date-item';

const unSelShadow = {
    shadowColor:'#fff',
    shadowOffset:{ h:8,w:4},
    shadowRadius:3,
    shadowOpacity:0.1,
}

interface Data {
    id?: string | number,
    text?: string | number
}

type PageOwnProps = {
    selected?: boolean,
    onClick?: () => {},
    data: string | Data,
    field?: string,
}

class DateItem extends Component<PageOwnProps> {

    static defaultProps = {
        onClick: () => {},
        field: 'text'
    }

    constructor(props) {
        super(props);
        this.state = {  };
    }

    getSelectedItemStyle = () => {
        const { selected } = this.props;
        const style = classnames(`${prefix}`, {
            [`${prefix}-selected`]: selected
        });
        return style;
    }

    getSelectedTextStyle = () => {
        const { selected } = this.props;
        const textCls = classnames(`${prefix}-text`, {
            [`${prefix}-text-selected`]: selected
        });
        return textCls;
    }

    getText = () => {
        const { data, field } = this.props;
        if(typeof data === 'string') {
            return data;
        }

        const { [field]: text } = data;
        return text;

    }

    renderSelect = () => {
        const text = this.getText();
        return (
            <View 
                className={`${prefix}-container-selected`} 
            >
                <Text className={`${prefix}-text-selected`}>{text}</Text>
            </View>
        )
    }

    renderUnSelect = () => {
        const { onClick } = this.props;
        return (
            <View 
                className={`${prefix}-container-unselect`} 
                onClick={onClick}
                style={unSelShadow}
                // colors={['rgba(197,197,197, .1)', 'rgba(153,153,153,.3)']}
            >
                <Text className={`${prefix}-text`}>{this.getText()}</Text>
            </View>
        )
    }

    render() {
        const itemCls = this.getSelectedItemStyle();
        const { selected } = this.props;
        
        return (
            <View className={itemCls}>
                { selected ? this.renderSelect() : this.renderUnSelect()}
            </View>
        );
    }
}

export default DateItem;