import Taro, { Component } from '@tarojs/taro';
import { Input } from '@tarojs/components';

import './index.scss';

const clsPre =  `price`;

type PageOwnProps = {
    placeholder?: string|undefined,
    value?: any,
    disabled?: boolean|undefined,
    onInput: (value) => any
}

class Price extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {

        const { placeholder, value, disabled, onInput } = this.props;
        return (
            <Input 
                placeholder={placeholder}
                placeholderClass={`${clsPre}-placeholder`}
                value={value}
                disabled={disabled}
                className='price'
                onInput={onInput}
                type='number'
            />
        );
    }
}

export default Price;