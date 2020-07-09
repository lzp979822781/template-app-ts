import Taro, { Component } from '@tarojs/taro';
// import { View } from '@tarojs/components';
import { Drawer } from "@ant-design/react-native";

import './index.scss';

type PageOwnProps = {
    show?: boolean|undefined,
    mask?: boolean,
    right?: boolean|undefined,
    onClose?: (data?: any) => {},
    renderSidebar?: any
}

class TaroDrawer extends Component<PageOwnProps> {

    static defaultProps = {
        right: true
    }

    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { show, right } = this.props;
        return (
            <Drawer
                sidebar={this.props.renderSidebar}
                position={right ? 'right' : 'left'}
                open={!!show}
                    // onOpenChange={this.onOpenChange}
                    // rgba(51,56,64,0.70)'
                drawerBackgroundColor='rgba(51,56,64,0.70)'
                drawerWidth={305}
            >
                { this.props.children}
                
            </Drawer>
        );
    }
}

export default TaroDrawer;