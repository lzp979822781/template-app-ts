import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import { isRn } from '@/utils/utils';

import './index.scss';

const clsPre = 'service-item';

interface ItemData {
    active?: boolean | undefined,
    type: string
}

type PageOwnProps = {
    text: string,
    style?: object,
    className?: string,
    onClick?: (data) => any,
    data: ItemData
}

type PageOwnState = {
    active?: boolean | undefined,
}

class ServiceItem extends Component<PageOwnProps, PageOwnState> {

    constructor(props) {
        super(props);
        this.state = {  
            active: false
        };
    }

    static externalClasses = ['my-cls']

    onClick = () => {
        const { active } = this.state;
        this.setState({ active: !active });
        this.setParentValue({active: !active});
    }

    setParentValue = (param) => {
        const { onClick, data } = this.props;
        if(onClick) {
            onClick({ ...data, ...param});
        }
    }

    getStyle = () => {
        const { style } = this.props;
        return isRn ? style: {};
    }

    render() {
        const { active } = this.state;
        const { text } = this.props;
        const itemCls = classnames(`${clsPre}`, { 
            [`${clsPre}-active`]: active
        });

        const textCls = classnames(`${clsPre}-text`, {
            [`${clsPre}-text-active`]: active
        })

        return (
            <View className={`${itemCls} my-cls`} style={this.getStyle()} onClick={this.onClick}>
                <Text className={`${textCls}`}>
                    {text}
                </Text>
            </View>
        );
    }
}

export default ServiceItem;