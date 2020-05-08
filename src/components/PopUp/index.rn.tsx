import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Modal } from '@ant-design/react-native';

import './index.scss'


type PageDispatchProps = {
}

type PageOwnProps = {
    visible: boolean,
    title?: string
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

        return (
            <View>
                <Modal
                    popup
                    
                >
                    { this.props.children }
                </Modal>
            </View>
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
