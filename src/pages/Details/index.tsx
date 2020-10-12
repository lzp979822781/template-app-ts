import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import classnames from 'classnames';
import { StatusBar, Header } from "@/components/index";
import { Text } from 'react-native';
import { DetailPopup, UserDrop, DetailList } from './components';
// import { JDNetworkErrorView } from '@jdreact/jdreact-core-lib';
// import JDRequest from "@/utils/jd-request";
import "./index.scss";

const TABPRREFIX = 'detail-tab';
const DROP_PREFIX = 'detail-drop';
const TABLE_PREFIX = 'detail-list';
const imgSrc = "https://img14.360buyimg.com/imagetools/jfs/t1/150235/13/5346/468881/5f34ef8fE104f2b45/f46728fd2c561d64.png";

const imagUrl = {
    downUnselectedImg: 'https://img14.360buyimg.com/imagetools/jfs/t1/150332/1/9010/355/5f696548Edcad7077/4f76b8c1aa722712.png',
    upUnselectedImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/113018/1/18354/452/5f696a66E16ea55ec/ce0a99d5fb383133.png',
    downSelectedImg: 'https://img10.360buyimg.com/imagetools/jfs/t1/149413/1/9000/456/5f6970f5Efd0d9453/6798fb52c84a79a7.png',
    upSelectedImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/123011/27/13237/854/5f699a27E514cb10d/0490e45d8a47c75f.png'
}

const testData = [
    {
        id: 1,
        shopName: '京东自营医药旗舰店',
        statusDesc: '待发货',
        dealId: 268588238,
        occurTime: '2020-03-12 16:32:13',
        orderSkuNum: 4, //分佣商品数量
        commission: 280,
        clientName: '北京协和医院', // 客户名称
        partnerCentCommissionOrderSkuVoList: [
            {
                id: '1-0',
                num: 5,
                img: imgSrc
            },
            {
                id: '1-1',
                num: 5,
                img: imgSrc
            },
            {
                id: '1-2',
                num: 5,
                img: imgSrc
            },
            {
                id: '1-3',
                num: 5,
                img: imgSrc
            },
            {
                id: '1-4',
                num: 5,
                img: imgSrc
            },
        ]
    },
    {
        id: 2,
        shopName: '京东自营医药旗舰店',
        statusDesc: '待发货',
        dealId: 268588238,
        occurTime: '2020-03-12 16:32:13',
        orderSkuNum: 4, //分佣商品数量
        commission: 280,
        clientName: '北京协和医院', // 客户名称
        partnerCentCommissionOrderSkuVoList: [
            {
                id: '2-0',
                num: 5,
                img: imgSrc
            },
            {
                id: '2-1',
                num: 5,
                img: imgSrc
            },
            {
                id: '2-2',
                num: 5,
                img: imgSrc
            },
            {
                id: '2-3',
                num: 5,
                img: imgSrc
            },
            {
                id: '2-4',
                num: 5,
                img: imgSrc
            },
        ]
    },
]

export default class Details extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            timeVisible: false,
            selectStart: '2020.10.15',
            selectEnd: '2020.10.16',

            userVisible: false,
            selectUser: {},
            
            shopList: testData
        };  
    }

    componentWillMount() {
    }

    config: Config = {
        navigationBarTitleText: "",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    onTimeSelect = () => {
        const { timeVisible } = this.state;
        this.setState({ timeVisible: !timeVisible })
    }

    onCustomSelect = () => {
        const { userVisible } = this.state;
        this.setState({ userVisible: !userVisible })
    }

    /**
     * 点击黑色背景是关闭当前搜索视图
     */
    onCloseUserSearch = () => {
        this.setState({ userVisible: false })
    }

    onSaveUser = selectUser => {
        this.setState({
            selectUser,
            userVisible: false
        })
    }

    /**
     * 选择新的时间后执行关闭弹框并且执行列表搜索
     */
    onTimeSave = newTime => {
        const [ selectStart, selectEnd ] = newTime.split('-');
        this.setState({
            selectStart,
            selectEnd,
            timeVisible: false
        })
    }

    
    /**
     * 明细顶部显示，显示当前总佣金
     * @returns
     */
    renderTop = () => {
        const { amount = 2389.98 } = this.props;
        const prefix = 'detail-top';
        return (
            <View className={prefix}>
                <View className={`${prefix}-title`}>
                    <Text className={`${prefix}-title-text`}>预估总佣金 (元)</Text>
                </View>
                <View className={`${prefix}-content`}>
                    <Text className={`${prefix}-content-text`}>{amount}</Text>
                </View>
            </View>
        );
    }

    /**
     * 动态切换选中和非选中、下拉和非下拉状态下的图标
     * @param {*} isVisible 是否下拉
     * @param {*} hasVal 是否有选中值
     * @returns
     */
    getImgSrc = (isVisible, hasVal) => {
        if(isVisible) {
            return imagUrl[ hasVal ?  'upSelectedImg' : 'upUnselectedImg']
        }

        return imagUrl[hasVal ? 'downSelectedImg': 'downUnselectedImg'];
    }

    getSelectTime = () => {
        const { selectStart, selectEnd } = this.state;
        return (!selectStart || !selectEnd) ? '' : `${selectStart}-${selectEnd}`;
    }

    /**
     * 显示时间和全部客户下拉选择
     * @returns
     */
    renderTab = () => {
        return (
            <View className={TABPRREFIX}>
                { this.renderTime()}
                { this.renderUser()}
                { this.renderUserSelect()}
            </View>
        );
    }

    renderTime = () => {
        const {  timeVisible} = this.state;
        const selectTime= this.getSelectTime();
        const timeImgSrc = this.getImgSrc(timeVisible, selectTime);

        const textCls = classnames(`${TABPRREFIX}-time-text`, {
            [`${TABPRREFIX}-time-text-selected`]:  selectTime
        })

        return (
            <View className={`${TABPRREFIX}-time`} onClick={this.onTimeSelect}>
                <Text className={textCls}>{selectTime || '起止时间'}</Text>
                <Image className={`${TABPRREFIX}-image`} src={timeImgSrc} />
            </View>
        );
    }

    renderUser = () => {
        const { userVisible, selectUser:{ customerName } } = this.state;
        // const userImgSrc = imagUrl[ userVisible ? 'upUnselectedImg': 'downUnselectedImg' ];
        const userImgSrc = this.getImgSrc(userVisible, customerName);
        const textCls  = classnames('${TABPRREFIX}-user-text', {
            [`${TABPRREFIX}-user-text-selected`]: customerName
        })
        return (
            <View className={`${TABPRREFIX}-user`} onClick={this.onCustomSelect}>
                <Text className={textCls} numberOfLines={1}>{customerName || '全部客户'}</Text>
                <Image className={`${TABPRREFIX}-image`} src={userImgSrc} />
            </View>
        );
    }

    renderUserSelect = () => {
        const { userVisible, selectUser } = this.state;
        if(!userVisible) return null;
        return (
            <View className={`${DROP_PREFIX}`}>
                <UserDrop 
                    currentVal={selectUser}
                    onSave={this.onSaveUser}
                />
                <View className={`${DROP_PREFIX}-bg`} onClick={this.onCloseUserSearch}>
                </View>
            </View>
        );
    }

    onPopupClose = () => {
        this.setState({ timeVisible: false })
    }

    renderList = () => {
        const { shopList } = this.state;
        return (
            <View className={`${TABLE_PREFIX}`}>
                <DetailList data={shopList} />
            </View>
        )
    }

    render() {
        const { timeVisible } = this.state;
        return (
            <View className='detail'>
                <StatusBar />
                <Header title='明细' noBack />
                { this.renderTop()}
                { this.renderTab()}
                { this.renderList()}
                <DetailPopup 
                    visible={!!timeVisible}
                    onClose={this.onPopupClose}
                    showValue={this.getSelectTime()}
                    onTimeSave={this.onTimeSave}
                />
                {/* <DetailDatePicker /> */}
            </View>
        );
    }
}
