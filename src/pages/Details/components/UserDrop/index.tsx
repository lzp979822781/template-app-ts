import Taro, { Component } from "@tarojs/taro";
import classnames from 'classnames';
import { View, Image, Input, Text } from "@tarojs/components";
import { FlatList } from 'react-native';
import debounce from 'lodash/debounce';
import JDRequest from "@/utils/jd-request";
import REQUEST_URL from '../../services';

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
    listData: Array<object>,
    loading: boolean,
    pageNum: number,
    lastPage: boolean,
}



type pageOwnProps = {
    currentVal: User,
    onSave: (param) => any
}

const testData = [
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
    {
        id: 5,
        customerName: '同仁堂保健医院上海分公司',
    },
    {
        id: 6,
        customerName: '同仁堂保健医院河北分公司',
    },
    {
        id: 7,
        customerName: '同仁堂保健医院河南分公司',
    },
    {
        id: 8,
        customerName: '同仁堂保健医院安徽分公司',
    },
]

class UserDrop extends Component<pageOwnProps, pageOwnState> {
    constructor(props) {
        super(props);
        const { customerName } = props.currentVal;
        this.state = {
            searchValue: customerName || '',
            listData: [],
            selectedUser: props.currentVal,
            loading: true,
            pageNum: 1,
            lastPage: false
        };
        this.getUserData = debounce(this.getUserData, 100);
    }

    componentDidMount() {
        this.getUserData();
    }

    totalPage = 100

    getUserData = async () => {
        // 执行搜索
        const { listData, pageNum, searchValue } = this.state;
        const param = {
            pageSize: 10,
            customerName: searchValue === '全部客户' ? '' : searchValue,
            pageNum
        };

        const { success, data: { totalCount, pageSize, lastPage, data = [] }, } = await JDRequest.post(REQUEST_URL.customerList, param, true);
        const reqData = Array.isArray(data) ? data : [];
        if (success) {
            const resData = pageNum === 1 ? [{
                id: 'all',
                customerName: '全部客户'
            }, ...reqData] : listData.concat(reqData)
            this.setState({
                listData: resData,
                pageNum: pageNum + 1,
                lastPage
            })
        }

        if (totalCount && pageSize) {
            this.totalPage = Math.floor(totalCount / pageSize);
        }
    }

    onLoadingData = () => {
        const { lastPage } = this.state;
        if (lastPage) {
            this.setState({ loading: false });
            return;
        }

        this.getUserData();
    }

    isLoadComplete = () => {
        const { pageNum } = this.state;
        return pageNum > this.totalPage;
    }

    handlePropsMethod = (methodName: string, paramArr = []) => {
        const { [methodName]: method } = this.props;
        if (method) {
            method(...paramArr);
        }
    }

    /**
     * 清空搜索
     */
    onClear = () => {
        const { searchValue } = this.state;
        if (!searchValue) return;
        this.setState({ searchValue: '' }, () => {
            this.getUserData()
        });
        // 执行空值搜索
    }

    timer;

    onInput = ({ target: { value } }) => {
        this.setState({
            searchValue: value,
            pageNum: 1
        }, () => {
            clearTimeout(this.timer);

            this.timer = setTimeout(() => {
                this.getUserData()
            }, 200);
        })
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
                <Input className={`${SEARCH_PREFIX}-input`} type='text' onInput={this.onInput} value={searchValue} textAlignVertical='center' />
                <View className={clearCls} onClick={this.onClear}>
                    {searchValue ? <Image className={`${SEARCH_PREFIX}-clear-img`} src={delSrc} /> : null}
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
            <View key={item.id} className={`${PREFIX}-list-item`} onClick={this.onItemClick(item)}>
                <View className={`${PREFIX}-list-item-container`}>
                    <Text className={textCls}>{customerName || "--"}</Text>
                </View>
                { isSelect ? (
                    <View className={`${PREFIX}-list-item-icon`}>
                        <Image className={`${PREFIX}-list-item-icon-img`} src={selectedSrc} />
                    </View>
                ) : null}
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
        if (!Array.isArray(listData) || (Array.isArray(listData) && !listData.length)) return null;
        return (
            <View className={`${PREFIX}-list`}>
                <FlatList
                    data={listData}
                    renderItem={({ item }) => this.renderItem(item)}
                    extraData={selectedUser}
                    onEndReachedThreshold={0.5}
                    style={{ maxHeight: 230 }}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.onLoadingData}
                />
            </View>
        );
    }

    renderFooter = () => {
        const { listData, loading } = this.state;
        if (!Array.isArray(listData) || (Array.isArray(listData) && !listData.length)) return null;

        return (
            <View className={`${PREFIX}-list-footer`}>
                <Text>{loading ? '加载中' : '没有更多了～'}</Text>
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