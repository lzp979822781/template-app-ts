import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import './index.scss';

const rootTag = `search-select`;
const goodTag = `search-select-good`;
const highImg = 'https://img11.360buyimg.com/imagetools/jfs/t1/123695/13/9458/306/5f34efc4Ef8162377/4da889d7fe34439b.png';
const lowImg = 'https://img10.360buyimg.com/imagetools/jfs/t1/130187/12/6891/412/5f34efc5Efa176c44/2819ac0b4e3f49e0.png';

type PageOwnProps = {
    onFilter: (data) => void
}

class SearchSelect extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    renderGoodSelect = () => {
        const { onFilter } = this.props;
        return (
            <View className={`${goodTag}`}>
                <View><Text className='search-select-text-common'>销售</Text></View>
                <View className={`${goodTag}-price`}>
                    <Text className='search-select-text-common'>价格</Text>
                    <View className={`${goodTag}-price-icon`}>
                        <View className={`${goodTag}-price-icon-high`}><Image src={highImg} className={`${goodTag}-price-icon-high-img`} /></View>
                        <View className={`${goodTag}-price-icon-low`}><Image src={lowImg} className={`${goodTag}-price-icon-low-img`} /></View>
                    </View>
                </View>
                <View>
                    <Text className={`${rootTag}-text-common`}>店铺</Text>
                </View>
                <View onClick={onFilter}>
                    <Text className={`${rootTag}-text-common`}>筛选</Text>
                </View>
                
            </View>
        );
    }

    render() {
        return (
            <View className={`${rootTag}`}>
                { this.renderGoodSelect()}
            </View>
        );
    }
}

export default SearchSelect;