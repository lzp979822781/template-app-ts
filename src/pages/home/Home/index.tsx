import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, Image, SwiperItem, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import img1 from '@/assets/images/01.png';
import img2 from '@/assets/images/02.png';
import img3 from '@/assets/images/03.png';
import img4 from '@/assets/images/04.png';

import { SearchBar } from '@/components';
import { UUID } from '@/utils/utils';

import { Title } from '../components';

import WonderfulVenue from '../WonderfulVenue';
import ExplosiveActivities from '../ExplosiveActivities';
import DrugItem from '../DrugItem';
import './index.scss'

type dispatchProps = {
    type: string,
    payload: any,
    resolve: any
}

type PageDispatchProps = {
    count: number
    dispatch: (param: dispatchProps) => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageDispatchProps & PageOwnProps


@connect(({ hello, ...other }) => ({ ...hello, ...other }))
class Home extends Component<IProps, PageState> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
        navigationBarTitleText: '首页'
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
        // this.getData();
    }

    componentDidHide() { }

    /**
     * 搜索框扫描
     */
    onScan = () => {
        console.log("扫描事件");
        const type = Taro.getEnv();
        if(type !== 'RN') {
            Taro.scanCode({ scanType: ['barCode', 'qrCode']}).then(res => {
                console.log("res", res);
            }).catch(e=> {
                console.log("扫描错误", e);
            })
        }
    }

    /**
     * 列表滚动到底部时触发
     */
    onListScrollLower = (event) => {
        console.log("scrollLower", event);
    }

    onListItemClick = (itemData) => {
        console.log('itemData', itemData);
    }

    renderSwipperItem = () => {
        const data = [ 
            { url: img1 },
            { url: img2 }, 
            { url: img3 },
            { url: img4 }
        ];
        return data.map((item) => {
            const {  url } = item;
            return (
                <SwiperItem className='swipper-item' key={UUID()} style={{ backgroundColor: '#8EA7E1'}}>
                    <Image src={url} />
                </SwiperItem>
            )
        })
    }

    renderListTitle = () => {
        return (
            <View>
                <Title 
                    title='常购药品'
                    more='更多常购药品'
                />
            </View>
        )
    }

    renderList = () => {

        const data = [
            {
                imgSrc: img1,
                selfSku: true,
                title: '澳佳宝原味深海原鱼油',
                subTitle: '广西玉林制药集团有限公司',
                spec: '10g*9袋',
                minPrice: '2.68',
                maxPrice: '186.00',
                isReduce: true, // 是否满减
                secKill: true, // 秒杀
                saleShopNum: 22
            },
            {
                imgSrc: img2,
                selfSku: true,
                title: 'HECH赫熙天然鱼子酱鱼子酱',
                subTitle: '广西玉林制药集团有限公司',
                spec: '10g*9袋',
                minPrice: '2.68',
                maxPrice: '186.00',
                isReduce: false, // 是否满减
                secKill: false, // 秒杀
                saleShopNum: 22
            },
            {
                imgSrc: img3,
                selfSku: false,
                title: '润肺定喘去痰止咳',
                subTitle: '广西玉林制药集团有限公司',
                spec: '10g*9袋',
                minPrice: '2.68',
                maxPrice: '186.00',
                isReduce: true, // 是否满减
                secKill: false, // 秒杀
                saleShopNum: 22
            }
        ]
        return (
            <View className='home-list'>
                { this.renderListTitle()}
                <ScrollView
                    scrollY
                    scrollWithAnimation
                    scrollTop={0}
                    lowerThreshold={20}
                    onScrollToLower={this.onListScrollLower}
                >
                    { data.map(item => {
                        return (<DrugItem 
                            itemData={item}
                            onItemClick={this.onListItemClick}
                            key={UUID()}
                        />)
                    })}
                </ScrollView>
            </View>
        )
    }

    callModel = (type: string, data = {}) => {
        return new Promise((resolve) => {
            this.props.dispatch({
                type: `hello/${type}`,
                payload: data,
                resolve
            })
        })
    }

    render() {
        return (
            <View className='home'>
                <View className='nav'>
                    <View className='header'>
                        <SearchBar 
                            onRightClick={this.onScan}
                        />
                    </View>
                </View>
                <Swiper
                    className='swipper-container'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    interval={2000}
                    autoplay
                >
                    { this.renderSwipperItem()}
                </Swiper>
                <WonderfulVenue />
                <ExplosiveActivities 
                    custom-cls='explosive-custom'
                />
                { this.renderList()}
            </View>
        )
    }
}

export default Home
