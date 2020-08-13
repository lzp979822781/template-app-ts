import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import { Drawer } from '@/components';

import { SearchInput, SearchSelect, SearchDrawer } from '../index';

import './index.scss';

const  backImg = 'https://img12.360buyimg.com/imagetools/jfs/t1/143521/13/5348/1377/5f34ef8fE7387ca64/4ee10e0866ccefef.png';

type PageOwnProps = {
    searchVal?: string|undefined
};

type PageOwnState = {
    drawerShow?: boolean,
    serviceData?: Array<object>
}

class SearchGoodsList extends Component<PageOwnProps, PageOwnState> {
    constructor(props) {
        super(props);
        this.state = {  
            drawerShow: true,
            serviceData: []
        };
    }

    componentDidMount() {
    }

    toSearchPage = () => {
        Taro.navigateTo({ url: '/pages/home/search/Search/index'})
    }

    onBack = () => {
        Taro.navigateBack();
    }

    onFilter = () => {
        Taro.showToast({ title: '打开筛选弹窗'});
        this.setState({ drawerShow: true });
    }

    onCloseSideBar = () => {
        this.setState({ drawerShow: false })
    }

    onServiceClick = (data) => {
        this.setState({ serviceData: data })
    } 

    renderHeader = () => {
        const { text: searchVal } = this.$router.params || {};
        return (
            <View className='goods-list-header'>
                <View className='goods-list-header-back' onClick={this.onBack}>
                    <Image src={backImg} className='goods-list-header-back-icon' />
                </View>
                <SearchInput 
                    searchVal={searchVal}
                    onClick={this.toSearchPage}
                />
            </View>
        );
    }

    renderItemSelect = () => {
        return (
            <View className='goods-list-select'>
                <SearchSelect 
                    onFilter={this.onFilter}
                />
            </View>
        );
    }

    renderTable = () => {
        return (
            <View>
                <Text>列表</Text>
            </View>
        );
    }

    renderSideBar = () => {
        return (
            <View className='goods-list-sidebar'>
                {/* <Button type='primary' onClick={this.onCloseSideBar}>关闭侧边栏</Button> */}
                <SearchDrawer 
                    onClick={this.onServiceClick}
                />
            </View>
        );
    }

    render() {
        const { drawerShow } = this.state;
        const isRn = Taro.getEnv().toLowerCase() === 'rn';

        return (
            <View className='goods-list'>
                { !isRn && this.renderHeader()}
                { !isRn && this.renderItemSelect()}
                { !isRn && this.renderTable() }
                <Drawer 
                    show={drawerShow}
                    // eslint-disable-next-line taro/render-props
                    renderSidebar={this.renderSideBar()}
                >
                    {this.renderHeader()}
                    {this.renderItemSelect()}
                    {this.renderTable()}
                    <View style={{ flex: 1}}>

                    </View>
                </Drawer>
                
            </View>
        );
    }
}

export default SearchGoodsList;