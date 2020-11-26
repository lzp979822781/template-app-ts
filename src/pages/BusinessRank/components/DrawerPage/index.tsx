import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import classnamse from 'classnames';
import { Gradient } from '@/components';
import SelectTitle from '../SelectTitle';
import SelectItem from '../SelectItem';
import './index.scss';

const PREFIX = 'drawer';

const testScopeData = [
    { label: '北京'}, { label: '广州'}, { label: '深圳'},
    { label: '上海'}, { label: '福建'}, { label: '重庆'},
    { label: '浙江'}, { label: '江苏'}, { label: '山东'},
    { label: '河北'},
];

const testDateData = [
    { label: '本月'}, { label: '上月'}, { label: '近一个月'},
    { label: '近三个月'}, { label: '近半年'}, { label: '近一年'},
];

const imgObj = {
    downSrc: 'https://img14.360buyimg.com/imagetools/jfs/t1/150609/35/8022/534/5fbf1e2aE4749f109/9c458497ed929ac1.png',
    upSrc: 'https://img14.360buyimg.com/imagetools/jfs/t1/154314/12/7098/522/5fbf1e7dE402bc053/b0ab6e2b8edefd1d.png'
}

interface PageOwnState {
    shopData: Array<any>,
    scopeData: Array<any>,
    dateData: Array<any>,
    scopeOpen: boolean
}

class DrawerPage extends Component<any, PageOwnState> {
    constructor(props) {
        super(props);
        this.state = {  
            shopData: [
                { label: '药品'},
                { label: '非药'}
            ],
            scopeData: testScopeData,
            scopeOpen: false,
            dateData: testDateData
        };
    }

    renderShopRight = () => {
        return (
            <View className={`${PREFIX}-shop-title-right`}>
                <Text className={`${PREFIX}-shop-title-right-text`}>备注: 更新时间T+1</Text>
            </View>
        );
    }

    /**
     * 点击商家类型子项事件
     * @memberof DrawerPage
     */
    onItemClick = (selectedItem, field) => () => {
        const { [field]: data } = this.state;
        const res = data.map(item => ({...item, selected: selectedItem.label === item.label}));
        this.setState({ [field]: res})
    }

    renderShopContent = () => {
        const { shopData } = this.state;
        return (
            <View className={`${PREFIX}-shop-content`}>
                {
                    shopData.map((item, index) => {
                        return <SelectItem data={item} onClick={this.onItemClick(item, 'shopData')} className={`${PREFIX}-shop-content-item`} key={index} />
                    })
                }
                { this.renderEmpty()}
            </View>
        );
    }

    renderEmpty = () => {
        return (
            <View className={`${PREFIX}-item-empty`}></View>
        );
    }

    /**
     * 商家类型渲染
     * @returns
     */
    renderBusinessType = () => {
        return (
            <View className={`${PREFIX}-shop-title`}>
                <SelectTitle title='商家类型' renderRight={() => this.renderShopRight()} />
                { this.renderShopContent()}
            </View>
        );
    }

    onHandleScopeOpen = () => {
        const { scopeOpen } = this.state;
        this.setState({ scopeOpen: !scopeOpen})
    }

    /**
     * 经营范围右侧箭头
     * @returns
     */
    renderScopeRight = () => {
        const { scopeOpen, scopeData } = this.state;
        if(scopeData.length <= 9) {
            return null;
        }

        return (
            <View className={`${PREFIX}-scope-title-right`} onClick={this.onHandleScopeOpen}>
                <Image className={`${PREFIX}-scope-title-right-img`} src={scopeOpen ? imgObj.upSrc: imgObj.downSrc} />
            </View>
        )
    }

    /**
     * 为了最后一行居左对齐,填补空白节点
     * @param {*} data
     * @returns
     */
    getEmptyData = (data) => {
        const isArray = Array.isArray(data);
        const length  = data.length;
        if(!isArray || (isArray && !length)) return [];
        const bakeNum = length % 3;
        return bakeNum ? Array(3 - bakeNum).fill(0) : [];
    }

    renderScopeContent = () => {
        const { scopeOpen, scopeData } = this.state;
        const contentCls = classnamse(`${PREFIX}-scope-container`, {
            [`${PREFIX}-scope-container-open`]: scopeOpen
        })

        const emptyData = this.getEmptyData(scopeData);
        
        return (
            <View className={contentCls}>
                {
                    scopeData.map((item, index) => {
                        return <SelectItem data={item} onClick={this.onItemClick(item, 'scopeData')} className={`${PREFIX}-scope-container-item`} key={index} />;
                    })
                }

                { 
                    emptyData.map(() => this.renderEmpty())
                }
            </View>
        )
    }

    /**
     * 经营范围渲染
     */
    renderBusinessScope = () => {
        
        return (
            <View className={`${PREFIX}-scope`}>
                <SelectTitle title='经营范围' renderRight={() => this.renderScopeRight()} />
                { this.renderScopeContent()}
            </View>
        );
    }

    renderDateContent = () => {
        const { dateData } = this.state;
        const emptyData = this.getEmptyData(dateData);
        return (
            <View className={`${PREFIX}-date-container`}>
                {
                    dateData.map((item, index) => {
                        return (
                            <SelectItem data={item} onClick={this.onItemClick(item, 'dateData')} className={`${PREFIX}-date-container-item`} key={index} />
                        );
                    })
                }
                { 
                    emptyData.map(() => this.renderEmpty())
                }
            </View>
        );
    }

    renderDate = () => {
        return (
            <View className={`${PREFIX}-date`}>
                <SelectTitle title='日期' />
                { this.renderDateContent()}
            </View>
        );
    }

    getSelectedData = data => {
        return data.filter(item => item.selected)
    }

    /**
     * 保存功能
     */
    onSave = () => {
        // 保存查询条件
        // const { shopData, scopeData, dateData } = this.state;

    }

    setUnselect = data => {
        return data.map(item => ({ ...item, selected: false }))
    }

    /**
     * 重置功能
     */
    onReset = () => {
        const { shopData, scopeData, dateData } = this.state;
        this.setState({
            shopData: this.setUnselect(shopData),
            scopeData: this.setUnselect(scopeData),
            dateData: this.setUnselect(dateData)
        })
    }

    renderBtn = () => {
        return (
            <View className={`${PREFIX}-btn`}>
                <View className={`${PREFIX}-btn-left`} onClick={this.onReset}>
                    <Text className={`${PREFIX}-btn-left-text`}>重置</Text>
                </View>
                <View 
                    className={`${PREFIX}-btn-right`}
                    onClick={this.onSave}
                >
                    <Gradient
                        className={`${PREFIX}-btn-right`}
                        angle={0}
                        colors={["#EC1B1B", "#FF511D"]}
                    >
                        <Text className={`${PREFIX}-btn-right-text`}>确定</Text>
                    </Gradient>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View className={`${PREFIX}`}>
                <View className={`${PREFIX}-container`}>
                    { this.renderBusinessType()}
                    { this.renderBusinessScope()}
                    { this.renderDate()}
                </View>
                { this.renderBtn()}
            </View>
        );
    }
}

export default DrawerPage;