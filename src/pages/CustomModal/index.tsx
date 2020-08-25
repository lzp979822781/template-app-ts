import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';


class Cart extends Component<any, any> {
    
    static defaultProps = {
        show: false
    }

    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        const {show} = this.props;
        if(!show) return null;
        
        return (
            <View className='custom-modal'>
                <View className='custom-modal-entity'>
                    { this.props.children}
                </View>
            </View>
        );
    }
}

export default Cart;