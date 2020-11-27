import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { Gradient } from '@/components';
import ConditionItem from '../ConditionItem';
import './index.scss';

const PREFIX = 'sel';

const imgObj = {
    selection: 'https://img13.360buyimg.com/imagetools/jfs/t1/143170/24/15798/586/5fbe012cEbfc27cc7/b4a444db621610a1.png',
}

interface PageOwnProps {
    onSelection: () => any
}

interface PageOwnState {
    data: Array<{ label: string, selected?: string|undefined}>
}

class SelectCondition extends Component<PageOwnProps, PageOwnState> {
    constructor(props) {
        super(props);
        this.state = {  
            data: [
                { label: '已下单', selected: 'down'},
                { label: '已出库'},
                { label: '下单客户数'},
                { label: '客单价'},
                { label: '客均价'},
            ]
        };
    }

    onDirectionClick = (selectedItem, direction) => {
        const { label } = selectedItem;
        const { data } = this.state;
        const res = data.map(item => label === item.label ? { ...item, selected: direction} : item)
        this.setState({ data: res}, () => {
            // 刷新列表
        })
    }

    onUpClick = selectedItem => () => {
        this.onDirectionClick(selectedItem, 'up');
    }

    onDownClick = selectedItem => () => {
        this.onDirectionClick(selectedItem, 'down');
    }

    onTextClick = selectedItem => () => {
        const { selected  } = selectedItem;
        const direction = selected ? (selected === 'up' ? 'down' : 'up') : 'up';
        this.onDirectionClick(selectedItem, direction);
    }

    renderLeft = () => {
        const { data } = this.state;
        return (
            <View className={`${PREFIX}-left`}>
                <ScrollView className={`${PREFIX}-left-container`} scrollX>
                    <View className={`${PREFIX}-left-container`}>
                        {
                            data.map((item, index) => {
                                return (
                                    <ConditionItem 
                                        data={item}
                                        onUpClick={this.onUpClick(item)} 
                                        onDownClick={this.onDownClick(item)}
                                        onTextClick={this.onTextClick(item)}
                                        key={index} 
                                    />
                                );
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }

    renderRight = () => {
        const { onSelection } = this.props;
        return (
            <View className={`${PREFIX}-right`} onClick={onSelection}>
                <Text className={`${PREFIX}-right-text`}>筛选</Text>
                <Image className={`${PREFIX}-right-img`} src={imgObj.selection} />
            </View>
        );
    }

    renderMiddle = () => {
        return (
            <Gradient
                angle={0}
                colors={["rgba(216,216,216,0)", "rgba(238,238,238,.5)" ]}
                className={`${PREFIX}-middle`}
            >

            </Gradient>
        );
    }


    render() {
        return (
            <View className={`${PREFIX}`}>
                { this.renderLeft()}
                { this.renderMiddle()}
                { this.renderRight()}
            </View>
        );
    }
}

export default SelectCondition;