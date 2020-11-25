import Taro, { Component } from '@tarojs/taro';
// import { View } from '@tarojs/components';
import { Drawer } from "@ant-design/react-native";
import { StatusBar, Footer } from "@/components/index";
import './index.scss';

type PageOwnProps = {
    show?: boolean|undefined,
    drawerBackgroundColor?: string,
    mask?: boolean,
    right?: boolean|undefined,
    onClose?: (data?: any) => {},
    onOpenChange?: (data?: any) => {},
    renderSidebar?: any,
    drawerWidth?: number | undefined
}

class TaroDrawer extends Component<PageOwnProps> {

    static defaultProps = {
        right: true,
        drawerBackgroundColor: 'rgba(51,56,64,0.70)',
        onOpenChange: (isOpen)=>{
            console.log('是否打开了 Drawer', isOpen.toString());
        }
    }

    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { show, right, drawerBackgroundColor, onOpenChange, drawerWidth=305 } = this.props;
        return (
            <Drawer
                sidebar={this.props.renderSidebar}
                position={right ? 'right' : 'left'}
                open={!!show}
                onOpenChange={onOpenChange}
                    // rgba(51,56,64,0.70)'
                drawerBackgroundColor={drawerBackgroundColor}
                drawerWidth={drawerWidth}
            >
                { this.props.children}
            </Drawer>
        );
    }
}

export default TaroDrawer;