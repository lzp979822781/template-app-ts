import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, Image, SwiperItem, ScrollView, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { UUID } from '@/utils/utils';
import Request from '@/utils/Request';
import { get, post } from "@/utils/multi-request";
import util from '../../login/util.js'

import { Title, HomeSearch } from '../components';

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

    onSearchClick = () => {
        Taro.navigateTo({ url: '/pages/home/search/Search/index'})
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
            { url: 'https://img10.360buyimg.com/imagetools/jfs/t1/113013/34/14655/437725/5f34ef8eEa7a405ab/30d0945a08fc4c22.png' },
            { url: 'https://img11.360buyimg.com/imagetools/jfs/t1/112751/6/14929/213590/5f34ef8eE42adfb6c/259ce8a3ebff49fe.png' },
            { url: 'https://img14.360buyimg.com/imagetools/jfs/t1/150235/13/5346/468881/5f34ef8fE104f2b45/f46728fd2c561d64.png' },
            { url: 'https://img14.360buyimg.com/imagetools/jfs/t1/150235/13/5346/468881/5f34ef8fE104f2b45/f46728fd2c561d64.png' }
        ].map( item => ({...item, key: UUID()}));
        return data.map((item) => {
            const {  url, key } = item;
            return (
                <SwiperItem className='swipper-item' key={key} style={{ backgroundColor: '#8EA7E1'}}>
                    <View>
                        <Image src={url} />
                    </View>
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
                imgSrc: 'https://img10.360buyimg.com/imagetools/jfs/t1/113013/34/14655/437725/5f34ef8eEa7a405ab/30d0945a08fc4c22.png',
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
                imgSrc: 'https://img11.360buyimg.com/imagetools/jfs/t1/112751/6/14929/213590/5f34ef8eE42adfb6c/259ce8a3ebff49fe.png',
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
                imgSrc: 'https://img14.360buyimg.com/imagetools/jfs/t1/150235/13/5346/468881/5f34ef8fE104f2b45/f46728fd2c561d64.png',
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

    toLogin = () => {
        const isRn = Taro.getEnv().toLowerCase() === 'rn';
        if(!isRn) {
            const returnPage = '/pages/home/Home/index';
            Taro.navigateTo({
                url: `/pages/login/index/index?returnPage=${returnPage}`
            })
        }
        Taro.showToast({ title: 'rn端调用'})
    }

    sendReq = async () => {
        const res = await get({
            url: 'https://api.m.jd.com/api',
            // header: ,
            data: {
                functionId: 'api_user_userInfo',
                appid: 'yjc_pc',
                loginType: 2
            }
        });
        /* util.requestWithLoginStatus({
            url: 'https://api.m.jd.com/api',
            method:'GET',
            header: {"contentType":"application/x-www-form-urlencoded"},
            data: {
                wxappid: 'wx9110daef657d4066',
                pappid: 'wx9110daef657d4066',
                appid: 'yjc_pc',
                functionId: 'api_user_userInfo'
            },
            complete: res => {
                console.log("res", res);
            }
          }) */
          console.log("res", res);
        
        /* const res = await get({
            url: `https://api.m.jd.com/api`,
            urlParam: { functionId: 'queryNameList', appid: 'jdhunion', loginType: 2},
        });
        console.log("res", res); */
        /* try {
            const res = await Request.get("api_user_userInfo", {
                content: "hello",
            });
            console.log("res", res);
        } catch (e) {
            console.log("e", e);
        } */
        /* const res = await Taro.request({
            url: 'https://wxappbeta.m.jd.com/kwxp/norder/selectProvince.action?fromType=wxapp',
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {},
            credentials: "include",
            mode: "cors",
        });
        console.log("res", res); */

        /* const res = await post({
            url: 'https://wxappbeta.m.jd.com/kwxp/norder/selectProvince.action',
            urlParam: { fromType: 'wxapp' },
        });
        console.log("res", res); */
    }

    sendRnReq = async () => {
        const res = await Request.get("api_user_userInfo", {
            content: "hello"
        });
        console.log("rn", res);
    }

    render() {
        return (
            <View className='home'>
                <View className='nav'>
                    <View className='header'>
                        <HomeSearch 
                            onClick={this.onSearchClick}
                        />
                    </View>
                </View>
                <Button type='primary' onClick={this.toLogin}>微信登录</Button>
                <Button type='primary' onClick={this.sendReq}>发送请求</Button>
                <Button type='primary' onClick={this.sendRnReq}>rn请求</Button>
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
