import Taro, { Component } from "@tarojs/taro";
import classnames from 'classnames';
import { View, Image, Input, Text } from "@tarojs/components";
import { FlatList } from 'react-native';
import debounce from 'lodash/debounce';

import './index.scss';

const PREFIX = "user-drop";
const SEARCH_PREFIX = `${PREFIX}-search-container`;
const delSrc = "https://img13.360buyimg.com/imagetools/jfs/t1/119279/6/20469/795/5f812c54Efb00fba1/da2e5ca9ac142768.png";
const searchSrc = "https://img10.360buyimg.com/imagetools/jfs/t1/127337/35/9610/1615/5f34ef8fEf5dc34e9/69cd6b38e4f579cb.png";
const selectedSrc = "https://img12.360buyimg.com/imagetools/jfs/t1/118154/7/19786/651/5f816ba1E49c42beb/aa34528b360a905f.png";

interface User {
    id?: number | string,
    customerName?: string
}

type pageOwnState = {
    searchValue: string,
    selectedUser: User,
    listData: Array<object>
}



type pageOwnProps = {
    currentVal: User,
    onSave: (param ) => any
}

const data = [
    {
        id: 'all',
        customerName: '全部客户'
    },
    {
        id: 1,
        customerName: '同仁堂保健医院天津分公司',
    },
    {
        id: 2,
        customerName: '同仁堂保健医院河北分公司',
    },
    {
        id: 3,
        customerName: '同仁堂保健医院呼和浩特分公司',
    },
    {
        id: 4,
        customerName: '同仁堂保健医院北京分公司',
    },
]

class UserDrop extends Component<pageOwnProps, pageOwnState> {
    constructor(props) {
        super(props);
        const { customerName } = props.currentVal;
        this.state = {  
            searchValue: customerName || '',
            listData: data,
            selectedUser: props.currentVal
        };
        this.getUserData = debounce(this.getUserData, 300);
    }

    getUserData = (searchValue) => {
        // 执行搜索
    }

    handlePropsMethod = (methodName: string, paramArr = []) => {
        const { [methodName]: method } = this.props;
        if(method) {
            method(...paramArr);
        }
    }

    /**
     * 清空搜索
     */
    onClear = () => {
        const { searchValue } = this.state;
        if(!searchValue) return;
        this.setState({ searchValue: ''});
        // 执行空值搜索
    }

    onInput = ({ target: { value }}) => {
        this.setState({ searchValue: value })
    }

    renderSearch = () => {
        const { searchValue } = this.state;
        const clearCls = classnames(`${SEARCH_PREFIX}-clear`, {
            [`${SEARCH_PREFIX}-clear-active`]: searchValue
        })
        return (
            <View className={SEARCH_PREFIX}>
                <View className={`${SEARCH_PREFIX}-img`}>
                    <Image className={`${SEARCH_PREFIX}-img-icon`} src={searchSrc} />
                </View>
                <Input className={`${SEARCH_PREFIX}-input`} type='text' onInput={this.onInput} value={searchValue} />
                <View className={clearCls} onClick={this.onClear}>
                    { searchValue ? <Image className={`${SEARCH_PREFIX}-clear-img`} src={delSrc} /> : null}
                </View>
            </View>
        );
    }

    onItemClick = (item) => () => {
        const { customerName } = item;
        // item 点击事件
        this.setState({ 
            selectedUser: item,
            searchValue: customerName
        });
        this.handlePropsMethod('onSave', [item]);
    }

    renderItem = (item) => {
        const { selectedUser: { id: selectedId } } = this.state;
        const { customerName, id } = item;
        const isSelect = !!selectedId && (selectedId === id);
        const textCls = classnames(`${PREFIX}-list-item-text`, {
            [`${PREFIX}-list-item-text-active`]: isSelect
        })
        return (
            <View className={`${PREFIX}-list-item`} onClick={this.onItemClick(item)}>
                <View className={`${PREFIX}-list-item-container`}>
                    <Text className={textCls}>{customerName}</Text>
                </View>
                { isSelect ? (
                    <View className={`${PREFIX}-list-item-icon`}>
                        <Image className={`${PREFIX}-list-item-icon-img`} src={selectedSrc} />
                    </View>
                ): null }
            </View>
        );
    }

    /**
     * 用户搜索列表，如果不传入extraData的话，数据状态变化FlatList不会重新渲染，
     * 因此传入extraData为选中的用户值，如果这个值变化会重新进行渲染
     * @returns
     */
    renderList = () => {
        const { listData, selectedUser } = this.state;
        if(!Array.isArray(listData) || (Array.isArray(listData) && !listData.length)) return null;
        return (
            <View className={`${PREFIX}-list`}>
                <FlatList 
                    data={listData}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={item => item.id}
                    extraData={selectedUser}
                />
            </View>
        );
    }

    render() {
        return (
            <View className={PREFIX}>
                { this.renderSearch()}
                { this.renderList()}
            </View>
        );
    }
}

export default UserDrop;