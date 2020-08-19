import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './index.scss';

const clsPre = 'condition-pre';
const upImg = "https://img11.360buyimg.com/imagetools/jfs/t1/120334/25/9632/1151/5f34efc5E477e00a1/afddc861578b4ea7.png";
const downImg = "https://img10.360buyimg.com/imagetools/jfs/t1/142086/15/5234/837/5f34efc4Ebb6c3557/31a4f399c3c39348.png";

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