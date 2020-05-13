import Taro, { Component, Config } from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components';

import './index.scss'

type PageOwnProps = {
    autoplay?: boolean,
    children?: any,
    data?: Array<any>
}

type PageState = {}

type IProps = PageOwnProps

interface SwipperExample {
    props: IProps;
}

const defaultProps = {
    autoplay: true
}


class SwipperExample extends Component<IProps, PageState> {

    static defaultProps = defaultProps
    static externalClasses = ['swipper-class']

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
        navigationBarTitleText: '测试页',
    }

    static options = {
        addGlobalClass: true
    }

    constructor(props: any) {
        super(props);
        this.state = {
            
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() { }

    componentDidShow() {

    }

    renderSwipperItem = () => {
        const data = [ 
            { backgroundColor: 'red', url: 'https://imgcps.jd.com/ling4/4635736/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5c17126882acdd181dd53ce0/95c21515/cr_1125x549_0_72/s1125x690/q70.jpg' },
            { backgroundColor: 'green', url: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/30451/34/12138/108202/5cb7720aE6ebf11ec/9945f5b3b9f9547f.jpg!cr_1125x549_0_72!q70.jpg.dpg' }, 
            { backgroundColor: 'blue', url: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/54392/1/2538/95587/5d064ea3E74ca0763/dc1d10fbd105d8a0.jpg!cr_1125x549_0_72!q70.jpg.dpg'}
        ];
        return data.map((item) => {
            const { backgroundColor, url } = item;
            return (
                <SwiperItem className='swipper-item' style={{ backgroundColor }}>
                    <Image src={url} />
                </SwiperItem>
            )
        })
    }

    render() {
        const { autoplay } = this.props;
        return (
            <Swiper
                className='swipper-class'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
                autoplay={autoplay}
            >
                { this.props.children }
            </Swiper>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default SwipperExample
