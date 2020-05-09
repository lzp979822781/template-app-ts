import Taro, { Component } from '@tarojs/taro';
// import classnames from 'classnames';
import { View, Image } from '@tarojs/components';
import { Modal } from '@ant-design/react-native';

import closeImg from '@/assets/images/icon_close.png';

import './index.scss'


type PageDispatchProps = {
}

type PageOwnProps = {
    visible: boolean,
    title?: string,
    onClose?: () => void,
    style?: () => void,
    maskClosable?: boolean
}

type PageState = {}

type IProps = PageDispatchProps & PageOwnProps

const defaultProps = {
    maskClosable: true
}

class PopUp extends Component<IProps, PageState> {

    static defaultProps = defaultProps
    static externalClasses = ['container-class', 'header-cls', 'body-cls']

    constructor(props: any) {
        super(props);

        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    handleClose = () => {

    }

    /**
     * 这里不直接在图片上定义事件的原因是，这种情况下点击实际不起作用，要使用事件必要在View上定义事件
     * 这是限制很大可能是有rn端限制引起的
     * @returns
     */
    renderHeader = () => {

        const { onClose, title } = this.props;
        /* return (
            <View className='pop-rn-header'>
                <Image src={closeImg} className='close-img' onClick={this.onClose} />
            </View>
        ) */
        if(!title) {
            return null;
        }
        return (
            <View className='pop-new-header'>
                <View className='pop-new-header-title'>{title}</View>
                <View className='pop-new-header-image' onClick={onClose}>
                    <Image src={closeImg} className='pop-new-header-image' />
                </View>
            </View>
        )
    }

    render() {
        const { visible, onClose, maskClosable } = this.props;

        return (
            <Modal
                popup
                visible={visible}
                onClose={onClose}
                transparent={false}
                animationType='slide-up'
                style={{ borderRadius: 16}}
                bodyStyle={{ paddingHorizontal: 10, minHeight: 300, maxHeight: 475 }}
                maskClosable={maskClosable}
            >
                { this.renderHeader()}
                <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    { this.props.children }
                </View>
            </Modal>
        )
    }
}

export default PopUp;
