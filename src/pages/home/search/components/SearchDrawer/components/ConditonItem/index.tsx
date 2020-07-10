import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import upImg from '@/assets/images/up.png';
import downImg from '@/assets/images/down.png';

import './index.scss';

const clsPre = 'condition-pre';

type PageOwnProps = {
    title: string
}

type PageState = {
    open: boolean|undefined
}

class ConditonItem extends Component<PageOwnProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {  
            open: true
        };
    }

    renderHeader = () => {

        const { title } = this.props;
        const { open } = this.state;

        return (
            <View>
                <View className={`${clsPre}-header`}>
                    <Text>{title}</Text>
                    <View className={`${clsPre}-icon`}>
                        <Image src={open ? downImg : upImg} className={`${clsPre}-icon-img`} />
                    </View>
                </View>
            </View>
        )
    }

    renderContent = () => {
        
    }

    render() {

        return (
            <View className={`${clsPre}`}>
                { this.renderHeader()}
                { this.renderContent()}
            </View>
        );
    }
}

export default ConditonItem;