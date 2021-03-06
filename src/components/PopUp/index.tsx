import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames';
import { View, Image } from '@tarojs/components'
// import { AtFloatLayout } from 'taro-ui'
import { connect } from '@tarojs/redux'

import './index.scss'

const closeImg = 'https://img11.360buyimg.com/imagetools/jfs/t1/115594/10/14831/968/5f34ef8fE575606fc/0468590cd7d66e91.png';

type PageDispatchProps = {
}

type PageOwnProps = {
    visible: boolean,
    title?: string,
    onClose?: () => void,
    scrollY?: boolean,
    scrollX?: boolean,
    onAfterClose?: () => void,
    style?: object,
    headerStyle?: object, // 外部传入头部样式
    bodyStyle?: object,

    // rn的样式在这里完全没有作用，这里是为了防止警告
    rnStyle?: object,
    rnContainerStyle?: object,
    rnBodyStyle?: object,
    rnHeaderStyle?: object
}

type PageState = {}

type IProps = PageDispatchProps & PageOwnProps

const defaultProps = {
    scrollY: true,
    scrollX: false
}

@connect(({ hello, ...other }) => ({ ...hello, ...other }))
class PopUp extends Component<IProps, PageState> {

    static defaultProps = defaultProps
    static externalClasses = ['container-cls', 'header-cls', 'body-cls']

    constructor(props: any) {
        super(props);

        this.state = {}
    }


    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    renderHeader = () => {
        const { title, onClose, headerStyle } = this.props;
        if(!title) return null;
        return (
            <View className={classnames('pop-up-header', 'header-cls')} style={headerStyle}>
                {title}
                <Image src={closeImg} className='close-img' onClick={onClose} />
            </View>
        )
    }

    render() {
        const { visible, onClose, style, bodyStyle /* scrollY, scrollX, onAfterClose  */ } = this.props;
        const classes = classnames('pop-up', { active: visible });

        return (
            <View className={classes}>
                <View className='pop-up-overlay' onClick={onClose}></View>
                <View className={classnames('pop-up-container', 'container-cls')} style={style}>
                    {/* <View className={classnames('pop-up-header', 'header-cls')} style={headerStyle}>
                        {title}
                        <Image src={closeImg} className='close-img' onClick={onClose} />
                    </View> */}
                    {this.renderHeader()}
                    <View className={classnames('pop-up-body', 'body-cls')} style={bodyStyle}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        )
        /* return (
            <AtFloatLayout 
                isOpened={visible}
                scrollY={scrollY}
                scrollX={scrollX}
                onClose={onAfterClose}
                className='my-class'
            >
                { this.renderHeader()}
                { this.props.children }
            </AtFloatLayout>
        ) */
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default PopUp
