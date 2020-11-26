import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { StatusBar, Header, Drawer } from "@/components";
import { BusRankList, SelectCondition, DrawerPage } from './components';

import './index.scss';

const PREFIX = 'bus-rank';

interface OwnState {
    show: boolean,
    data: Array<any>
}

class BusinessRank extends Component<any, OwnState> {
    constructor(props) {
        super(props);
        this.state = {  
            show: false,
            data: []
        };
    }

    config: Config = {
        navigationBarTitleText: "",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    renderList = () => {
        const { data } = this.state;
        return (
            <View className={`${PREFIX}-list`}>
                <BusRankList data={[{ id: 1}, {id: 2}, { id: 3}, { id: 4}]} />
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

    render() {
        return (
            <View className={PREFIX}>
                { this.renderContent()}
            </View> 
        );
    }
}

export default BusinessRank;