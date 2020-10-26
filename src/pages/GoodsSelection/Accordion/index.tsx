import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import JDRequest from "@/utils/jd-request";
import { hoverStyle } from "@/utils/utils";
import "./index.scss";

type dataObject = {
    [key: string]: any;
};

type baseProps = {
    data?: dataObject;
}

export default class Accordion extends Component<baseProps, any> {
    static defaultProps = {
        data: {}
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cat1Id: 0,
            cat2Id: 0,
            cat3Id: 0
        }
    }

    componentWillMount() {
        this.getData();
    }

    //获取店铺数据
    getData = async () => {
        const res = await JDRequest.get("mjying_assist_partner_sku_category");
        if (res.success) {
            this.setState({
                data: res.data
            });
        } else {
            Taro.showModal({
                title: res.errorMsg,
                content: '',
            });
        };
    }

    setCatId = (item) => {
        if (item.level == 2) {
            this.setState({
                cat2Id: item.id
            })
        } else {
            this.setState({
                cat3Id: item.id
            })
        }

    }

    renderHeader = (data) => {
        const { cat2Id } = this.state;
        return data.map((item) => {
            return <View key={item.id} hoverStyle={hoverStyle} onClick={() => {
                this.setCatId(item)
            }}
            >
                <View className='accordion-header'>
                    <Text className={item.level == 2 ? 'accordion-header-txt' : 'accordion-item-txt'} >{item.name}</Text>
                    {item.level == 2 && cat2Id == item.id ? <Image
                        className='accordion-header-icon'
                        src='https://img10.360buyimg.com/imagetools/jfs/t1/152076/25/3339/514/5f92a721E264a2e62/3ef761bccb32ec36.png'
                    /> : null}
                </View>
                {cat2Id == item.id ? <View className='accordion-body'>
                    {this.renderItems(item.child)}
                </View> : null}
            </View>
        })
    }

    renderItems = (data) => {
        const { cat3Id } = this.state;
        return data.map((item) => {
            return <View key={item.id} hoverStyle={hoverStyle}  className='accordion-item' onClick={() => {
                this.setCatId(item)
            }}
            >
                <View
                    className={item.level == 3 && cat3Id == item.id ? 'accordion-item-icon-active': 'accordion-item-icon'}
                />
                <Text className='accordion-item-txt'>{item.name}</Text>
            </View>
        })
    }

    render() {
        const { data } = this.state;
        return (
            <View className='accordion'>
                {data[0] && data[0].child ? this.renderHeader(data[0].child) : null}
            </View>
        )
    }
}
