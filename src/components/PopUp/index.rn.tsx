import Taro, { Component } from '@tarojs/taro';
import { Modal } from '@ant-design/react-native';

import './index.scss'


type PageDispatchProps = {
}

type PageOwnProps = {
    visible: boolean,
    title?: string,
    onClose?: () => void,
}

type PageState = {}

type IProps = PageDispatchProps & PageOwnProps

class PopUp extends Component<IProps, PageState> {

    constructor(props: any) {
        super(props);

        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    handleClose = () => {

    }

    render() {
        const { visible, onClose } = this.props;
        return (
            <Modal
                popup
                visible={visible}
                onClose={onClose}
                transparent={false}
                animationType='slide-up'
                style={{ borderRadius: 32 }}
                bodyStyle={{ paddingTop: 32, paddingHorizontal: 10 }}
            >
                { this.props.children }
            </Modal>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default PopUp;
