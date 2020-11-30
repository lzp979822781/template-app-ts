import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { StatusBar, Header, Drawer } from "@/components";
import JDRequest from "@/utils/jd-request";
import { JDNetworkErrorView } from '@jdreact/jdreact-core-lib';
import REQUEST_URL from './services';
import { BusRankList, SelectCondition, DrawerPage } from './components';

import './index.scss';

const PREFIX = 'bus-rank';

interface OwnState {
    show: boolean,
    data: Array<any>,
    refreshing: boolean,
    lastPage: boolean,
    isTimeout: boolean
}

class BusinessRank extends Component<any, OwnState> {
    constructor(props) {
        super(props);
        this.state = {  
            show: false,
            data: [{ id: 1}, {id: 2}, { id: 3}, { id: 4}],
            // data: [],
            refreshing: false,
            lastPage: false,
            isTimeout: false, // 请求是否超时
        };
    }

    componentDidMount() {
        // this.getData();
    }

    config: Config = {
        navigationBarTitleText: "",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    pageNum = 1
    pageSize = 10

    getCommonParam = () => {
        return {};
    }

    getData = async (param = {}) => {
        // 拼接参数 即筛选条件
        const res = await JDRequest.post(REQUEST_URL.businessRankList, {
            ...this.getCommonParam(),
            ...param,
            pageSize: this.pageSize
        });

        if(res.success){
            this.listSuccessCallback(res);
        }else{
            this.handleError();
        };
    }

    listSuccessCallback = res => {
        const { data: currentPageData, lastPage } = res;
        const { data } = this.state;
        const validCurrentData = Array.isArray(currentPageData) ? currentPageData : [];
        const resData = this.pageNum === 1 ? validCurrentData : data.concat(validCurrentData);
        this.setState({
            data: resData,
            lastPage,
            refreshing: false,
        }, () => {
            this.canAction = !lastPage;
        })
    }

    handleError = () => {
        if(this.pageNum > 1) {
            this.pageNum -= 1;
        }
        this.setState({
            isTimeout: true,
            refreshing: false,
        })
    }


    onRefresh = () => {

        this.setState({ refreshing: true }, () => {
            // 获取数据
        })
    }

    canAction = false;
    onEndReached = () => {
        if (this.canAction) {
            this.canAction = false;
            this.pageNum = this.pageNum+1;
            this.getData();
        }
    }

    renderList = () => {
        const { data,  refreshing, lastPage } = this.state;
        return (
            <View className={`${PREFIX}-list`}>
                <BusRankList 
                    data={data}
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                    noMoreShow={lastPage}
                    onEndReached={this.onEndReached}
                />
            </View>
        );
    }

    onSelection = () => {
        this.setState({
            show: true
        })
    }

    onOpenChange = (isOpen) => {
        this.setState({ show: isOpen })
    }

    renderSelection = () => {
        return (
            <SelectCondition onSelection={this.onSelection} />
        )
    }

    renderContent = () => {
        const { show } = this.state;
        return (
            <Drawer 
                show={show}
                drawerBackgroundColor='#fff'
                drawerWidth={365}
                renderSidebar={<DrawerPage />}
                onOpenChange={this.onOpenChange}
            >
                <StatusBar />
                <Header title='商家排行榜' backApp />
                { this.renderSelection()}
                { this.renderList()}
                
            </Drawer>
        );
    }
    updata = () => {
        this.setState({
            isTimeout: true
        }, () => {
            this.getData();
        });
    };

    renderTimeout = () => {
        return (
            <View className={`${PREFIX}`}>
                <StatusBar />
                <Header title='商家排行榜' backApp />
                <JDNetworkErrorView onRetry={this.updata} />
            </View>
        );
    }

    render() {
        const { isTimeout } = this.state;
        if (isTimeout) {
            return this.renderTimeout();
        }
        return (
            <View className={PREFIX}>
                { this.renderContent()}
            </View> 
        );
    }
}

export default BusinessRank;