import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import signImg from '@/assets/my/grid/sign.png';

import GridItem from '../GridItem';

import './index.scss';

type PageOwnProps = {
    style?: any,
    className?: any
}

class Grid extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    static externalClasses = ['my-class']

    onItemClick = (itemField) => () => {
        console.log("itemField", itemField);
    }


    render() {
        const { style } = this.props;
        
        return (
            <View className='my-class grid' style={style}>
                <GridItem src={signImg} text='采购关系' onClick={this.onItemClick('purchase')} />
                <GridItem src={signImg} text='资质认证' onClick={this.onItemClick('natural')} />
                <GridItem src={signImg} text='我的月结' onClick={this.onItemClick('monthyPay')} />
                <GridItem src={signImg} text='我的优惠券' onClick={this.onItemClick('coupon')} />
                <GridItem src={signImg} text='我的关注' onClick={this.onItemClick('attention')} />
                <GridItem src={signImg} text='代扣签约' onClick={this.onItemClick('withhold')} badgeValue='已签约' />
            </View>
        );
    }
}

export default Grid;