import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames';
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import closeImg from '@/assets/images/icon_close.png';

import './index.scss'


type PageDispatchProps = {
}

type PageOwnProps = {
    visible: boolean,
    title?: string,
    onClose?: () => void
}

type PageState = {}

type IProps = PageDispatchProps & PageOwnProps

@connect(({ hello, ...other }) => ({ ...hello, ...other }))
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
        const { visible, title, onClose } = this.props;
        const classes = classnames('pop-up', { active: visible })

        return (
            <View className={classes}>
                <View className='pop-up-overlay' onClick={onClose}></View>
                <View className='pop-up-container'>
                    <View className='pop-up-header'>
                        {title}
                        <Image src={closeImg} className='close-img' onClick={onClose} />
                    </View>
                    <View className='pop-up-body'>
                        {this.props.children}
                    </View>
                </View>
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

export default PopUp
