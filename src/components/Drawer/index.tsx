import Taro, { Component } from '@tarojs/taro';
// import { View } from '@tarojs/components';
import { AtDrawer } from 'taro-ui';

type PageOwnProps = {
    show?: boolean|undefined,
    mask?: boolean,
    right?: boolean,
    onClose?: (data?: any) => {},
    renderSidebar?: any
}

class TaroDrawer extends Component<PageOwnProps> {

    static defaultProps = {
        show: false,
        right: true,
        mask: true
    }
    
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { show, onClose, right, mask } = this.props;
        return (
            <AtDrawer 
                show={!!show} 
                mask={!!mask}
                onClose={onClose}
                right={!!right}
                width='305px'
                className='drawer-weapp'
            >
                { this.props.renderSidebar }
            </AtDrawer>
        );
    }
}

export default TaroDrawer;