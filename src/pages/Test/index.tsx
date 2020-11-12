import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, ScrollView, Text, Button, Checkbox, Label, Swiper, SwiperItem, Image, CheckboxGroup } from '@tarojs/components';
import { Modal, PopUp, Badge, Drawer } from '@/components/index';
import { UUID, upload } from '@/utils/utils';

// import SwipperExample from '../SwipperExample';

import './index.scss'

const badgeImg = 'https://img10.360buyimg.com/imagetools/jfs/t1/148103/10/5311/6014/5f34ef8fEdf8161fa/62ffeeafea1095df.png';
const uploadImg = 'https://img10.360buyimg.com/imagetools/jfs/t1/127054/40/9573/2534/5f34ef8fEbdcc0963/e73c5e7590284553.png';
// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

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

interface Test {
    props: IProps;
}

const scrollTop = 0
const Threshold = 20

@connect(({ hello, ...other }) => ({ ...hello, ...other }))
class Test extends Component<any, any> {

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
            visible: false,
            show: false,
            list: [
                {
                  value: '美国',
                  text: '美国',
                  checked: false
                },
                {
                  value: '中国',
                  text: '中国',
                  checked: true
                },
                {
                  value: '巴西',
                  text: '巴西',
                  checked: false
                },
                {
                  value: '日本',
                  text: '日本',
                  checked: false
                },
                {
                  value: '英国',
                  text: '英国',
                  checked: false
                },
                {
                  value: '法国',
                  text: '法国',
                  checked: false
                }
            ],
            checkedVal: [],
            fileList: [],
            drawerShow: false, // 抽屉是否展示
        }

    }

    componentDidMount() {
    }

    onScrollToUpper = () => {
        console.log("滚动到顶部");
    }

    onScrollLower = () => {
        console.log("滚动到底部");
    }

    onScroll(e){
        console.log(e.detail)
    }

    onOpenModal = () => {
        this.setState({ visible: true })
    }

    onPopupClose = () => {
        this.setState({ show: false})
    }

    onClose = () => {
        this.setState({ visible: false })
    }

    onConfirm = () => {
        this.onClose();
    }

    renderFooter = () => {
        return (
            <View className='test-footer'>
                <Button onClick={this.onClose} className='test-com-btn'>取消</Button>
                <Button onClick={this.onConfirm} className='test-com-btn'>确定</Button>
            </View>
        );
    }

    onOpenActionSheet = () => {
        this.setState({ show: true })
    }
    
    /**
     * 复选框onChange事件
     */
    onCheckboxChange = ({detail: { value }}) => {
        this.setState({ checkedVal: value})
    }

    onDrawerClick = () => {
        this.setState({ drawerShow: true })
    }

    renderDrawer = () => {
        const { drawerShow } = this.state;
        return (
            <Drawer 
                show={drawerShow}
                renderSidebar={this.renderSideBar()}
            >
                <Button type='primary' onClick={this.onDrawerClick}>抽屉测试</Button>
            </Drawer>
        );
    }

    onCloseDrawer = () => {
        this.setState({ drawerShow: false})
    }

    renderSideBar = () => {
        return (
            <View className='test-drawer'>
                <Button type='primary' onClick={this.onCloseDrawer}>关闭抽屉组件</Button>
            </View>
        );
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
                <SwiperItem className='swipper-item' style={{ backgroundColor }} key={UUID()}>
                    <Image src={url} />
                </SwiperItem>
            )
        })
    }

    renderRnSwipperItem = () => {
        const data = [ 
            { backgroundColor: 'red', url: 'https://imgcps.jd.com/ling4/4635736/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5c17126882acdd181dd53ce0/95c21515/cr_1125x549_0_72/s1125x690/q70.jpg' },
            { backgroundColor: 'green', url: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/30451/34/12138/108202/5cb7720aE6ebf11ec/9945f5b3b9f9547f.jpg!cr_1125x549_0_72!q70.jpg.dpg' }, 
            { backgroundColor: 'blue', url: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/54392/1/2538/95587/5d064ea3E74ca0763/dc1d10fbd105d8a0.jpg!cr_1125x549_0_72!q70.jpg.dpg'}
        ];
        return data.map((item) => {
            const { backgroundColor, url } = item;
            return (
                <View className='swipper-item' style={{ backgroundColor }} key={UUID()}>
                    <Image src={url} />
                </View>
            )
        })
    }

    /**
     * rnStyle为设置rn端组件样式，rn端样式是以标准屏为标准, Taro本身是以2倍屏为标准
     * 所以在class中设置为10px rnStyle中设置为5
     * @returns
     */
    renderBadge = () => {
        const customBadge = (
            <View >
                <Image src={badgeImg} className='custom-badge' />
            </View>
        )
        return (
            <Badge 
                value={1000} 
                badge-cls='badge-cls' 
                rnStyle={{ marginTop: 30 }} 
                // eslint-disable-next-line taro/render-props
                renderBadge={customBadge}
                custom
            >
                <Button type='primary'>角标按钮</Button>
            </Badge>
        )
    }

    onChooseImg = () => {
        Taro.chooseImage({
            count: 2, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
            success:  (res) => {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths;
                if(Array.isArray(tempFilePaths) && tempFilePaths.length) {
                    tempFilePaths.forEach(async item => {
                        const file = {
                            uid: '-1',
                            status: 'done',
                            url: item
                        }
                        // const { success, data } = await this.uploadFile(file);
                        const uploadRes = await upload({ url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', file})
                        const { data, success } = uploadRes;
                        const { fileList } = this.state;
                        if(success) {
                            this.setState({ fileList: fileList.concat(data)})
                        }
                        console.log("uploadRes", uploadRes);
                    })
                }
            }
        })
        
    }

    uploadFile = file => {
        return new Promise(async (resolve) => {
            const isWeapp = Taro.getEnv() === 'WEAPP';
            const res = isWeapp ? await this.excludeRnUpload(file) : await this.rnUpload(file);
            resolve(res)
        })
        
    }

    excludeRnUpload = file => {
        return new Promise((resolve) => {
            Taro.uploadFile({
                url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                filePath: file.url,
                name: 'file',
                formData: {},
                success: res => {
                    resolve({ data:res, success: true })
                },
                fail: res => {
                    resolve({ error:res, success: false })
                }
            })
        })
    }

    rnUpload = file => {
        const formData = new FormData();
        formData.append("file", file);
        return new Promise((resolve) => {
            fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8',
                },
                body: formData
            }).then(response => response.json())
            .then(res => {
                resolve({ data:res, success: true })
            }).catch(res => {
                resolve({ error:res, success: false })
            })
        })
        
    }

    renderUpload = () => {
        const { fileList } = this.state;
        
        return (
            <View className='test-upload-container'>
                {
                    fileList.map(({ url }) => {
                        return (
                            <View key={UUID()}>
                                <Image src={url} className='test-upload-img' />
                            </View>
                        )
                    })
                }
                <View onClick={this.onChooseImg}>
                    <Image src={uploadImg} className='test-upload-img' />
                </View>
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
        const { visible, show, checkedVal=[] } = this.state;
        const isRn = Taro.getEnv().toLowerCase() === 'rn';

        return (
            <View className='test'>
                <Button type='primary' onClick={this.onOpenModal}>弹框测试</Button>
                <Button type='primary' onClick={this.onOpenActionSheet} className='test-actionsheet'>popup 弹框测试</Button>
                { !isRn && <Button type='primary' onClick={this.onDrawerClick}>抽屉测试</Button>}
                { this.renderDrawer()}
                { this.renderBadge()}
                { this.renderUpload()}
                <Modal 
                    visible={visible} 
                    title='弹框'
                    className='test-modal' 
                  // eslint-disable-next-line taro/render-props
                    renderFooter={this.renderFooter()}
                    renderHeader={<View><Text>标题</Text></View>}
                    // footer={footer}
                    onCancel={this.onClose}
                    onConfirm={this.onConfirm}
                    renderContent={<View><Text>content</Text></View>}
                    confirmText='确定'
                    cancelText='取消'
                    customFooter
                    customHeader
                />
                <Swiper
                    className='swipper-container'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    interval={2000}
                    autoplay
                    // onChange={(event) => { console.log('Swiper: onChange', event.detail.current) }}
                >
                    { this.renderSwipperItem()}
                </Swiper>
                {/* <SwipperExample>
                    { Taro.getEnv() === 'RN' ? this.renderRnSwipperItem() : this.renderSwipperItem()}
                </SwipperExample> */}
                    
                <View className='page-section-1'>
                    <Text>默认样式</Text>
                    <CheckboxGroup
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onChange={this.onCheckboxChange}
                    >
                        <Label style={{ flexDirection: 'row', alignItems: 'center'  }}>
                            <Checkbox value='1' checked={checkedVal.includes("1")} /><Text>选中</Text>
                        </Label>
                        <Label style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox  value='2' checked={checkedVal.includes("2")} /><Text>未选中</Text>
                        </Label>
                    </CheckboxGroup>
                    
                </View>

                <ScrollView
                    className='scrollview'
                    scrollY
                    scrollWithAnimation
                    scrollTop={scrollTop}
                    lowerThreshold={Threshold}
                    upperThreshold={-20}
                    onScrollToUpper={this.onScrollToUpper} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
                    onScrollToLower={this.onScrollLower}
                    onScroll={this.onScroll}
                >
                    <View className='vStyleA'><Text>A</Text></View>
                    <View className='vStyleB'><Text>B</Text></View>
                    <View className='vStyleC'><Text>C</Text></View>
                </ScrollView>

                <PopUp 
                    visible={show}
                    onClose={this.onPopupClose}
                    pop-class='pop-up-rn'
                    // style={{ borderRadius: '4px'}}
                    // container-cls='container-cls'
                    // header-cls='header-cls'
                    title='选择日期'
                >
                    <View>
                        <View>
                            <View className='page-section-1'>
                                <Text>默认样式</Text>
                                <Label style={{ flexDirection: 'row', alignItems: 'center'  }}>
                                    <Checkbox value='选中' checked /><Text>选中</Text>
                                </Label>
                                <Label style={{ flexDirection: 'row', alignItems: 'center'  }}>
                                    <Checkbox style='margin-left: 20px' value='未选中' /><Text>未选中</Text>
                                </Label>
                            </View>
                            <View className='page-section-2'>
                                <Text>推荐展示样式</Text>
                                {this.state.list.map((item, i) => {
                                    return (
                                        <Label className='checkbox-list__label' for={i} key={UUID()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'  }}>
                                            <Checkbox className='checkbox-list__checkbox' value={item.value} checked={item.checked} />
                                            <View className='check-item-text'>
                                                <Text>{item.text}</Text>
                                            </View>
                                        </Label>
                                    )
                                })}
                            </View>
                        </View>
                        
                        
                        <View className='vStyleA'><Text>A</Text></View>
                        <View className='vStyleB'><Text>B</Text></View>
                        <View className='vStyleC'><Text>C</Text></View>
                    </View>
                    
                </PopUp>
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

export default Test as ComponentClass<PageOwnProps, PageState>
