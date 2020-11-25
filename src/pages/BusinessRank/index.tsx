import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { StatusBar, Header, Drawer } from "@/components";
import { BusRankList } from './components';

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

    renderList = () => {
        const { data } = this.state;
        return (
            <View className={`${PREFIX}-list`}>
                <BusRankList data={[{ id: 1}, {id: 2}, { id: 3}, { id: 4}]} />
            </View>
        );
    }

    renderContent = () => {
        const { show } = this.state;
        return (
            <Drawer 
                show={show}
            >
                <StatusBar />
                <Header title='商家排行榜' backApp />
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