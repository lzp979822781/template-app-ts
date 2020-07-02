
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Gradient } from '@/components'

import './index.scss';

type PageOwnProps = {
    text: string,
    showIcon?: boolean,
    icon?: string|undefined,
    data?: object,
    onClick?: (data) => void
}

class SearchItem extends Component<PageOwnProps> {

    static defaultProps = {
        showIcon: false,
    }

    constructor(props) {
        super(props);
        this.state = {  };
    }

    onClick = () => {
        const { data, onClick } = this.props;
        if(onClick) {
            onClick(data);
        }
    }

    renderIcon = () => {
        const { icon } = this.props;
        if(!icon) return null;
        return (
            <Gradient 
                my-class='search-item-hot'
                className='search-item-hot'
                colors={['#F78D91', '#ED5458']}
            >
                <Text className='search-item-hot-text'>热</Text>
            </Gradient>
        );
    }

    render() {
        const { text } = this.props;
        return (
            <View className='search-item' onClick={this.onClick}>
                <Text className='search-item-text'>{text}</Text>
                { this.renderIcon() }
            </View>
        );
    }
}

export default SearchItem;