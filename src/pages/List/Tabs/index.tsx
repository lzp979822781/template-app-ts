import Taro, { Component } from '@tarojs/taro';
import { ScrollView, View, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'


class Tabs extends Component {
    static defaultProps = {
        current: 0,
        height: 40,
        tabList: [
            { title: 'First Tab' },
            { title: 'Second Tab' },
            { title: 'Third Tab' }
        ],
        onChange: () => { }
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(value) {
        this.setState({ current: value })
        const newVal = this.props.tabList[value];
        this.props.onChange(newVal)
    }

    renderContent = (data) => {
        return [1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            return (
                <View key={`${data.index}_${i}`} style='padding:40px 0px; margin: 20px; background-color: #ddd; text-align: center;'>
                    {data.title} - {i}
                </View>
            );
        });
    }

    renderAtTabsPane = () => {
        const { tabList } = this.props;
        const { current } = this.state;
        return tabList.map((item, index) => {
            return <AtTabsPane current={current} index={index} key={index.index} >
                <ScrollView style={{
                    // 获取设备信息，小程序 h5,需要一个固定高度去支持滚动，注：设置height：100%无效，必须是固定高度
                    height: `150px`
                }}
                    scrollY
                    scrollWithAnimation
                >
                    {this.renderContent(item)}
                </ScrollView>
            </AtTabsPane>
        })
    }

    render() {
        const { tabList } = this.props;
        const { current } = this.state;

        return (
            <AtTabs current={current} tabList={tabList} onClick={this.handleClick}>
                {this.renderAtTabsPane()}
            </AtTabs>
        )
    }
}


export default Tabs;
