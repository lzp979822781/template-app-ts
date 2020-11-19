import Taro, { Component } from "@tarojs/taro";
import { ScrollView, View, Text, Image } from "@tarojs/components";
import JDRequest from "@/utils/jd-request";
import { hoverStyle } from "@/utils/utils";
import "./index.scss";

type dataObject = {
    [key: string]: any;
};

type baseProps = {
    data?: dataObject;
    onChange?: any;
}

export default class Accordion extends Component<baseProps, any> {
    static defaultProps = {
        data: {},
        onChange: () => {

        }
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: true,
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
            const cat1Id = res.data[0].id;
            const cat2Id = res.data[0].child[0].id;
            const cat3Id = res.data[0].child[0].child[0].id;
            this.setState({
                data: res.data,
                cat1Id,
                cat2Id,
                cat3Id
            }, () => {
                this.props.onChange({
                    cat1Id,
                    cat2Id,
                    cat3Id
                });
            });

        };
    }

    setCatId = (item) => {
        const { cat2Id, show } = this.state;
        if (item.level == 2) {
            this.setState({
                cat2Id: item.id,
                cat3Id: item.child[0].id,
                show: item.id == cat2Id ? !show : true
            }, () => {
                if (this.state.show && item.id != cat2Id) {
                    this.props.onChange({
                        cat1Id: this.state.data[0].id,
                        cat2Id: this.state.cat2Id,
                        cat3Id: this.state.cat3Id
                    });
                }
            });
        } else {
            this.setState({
                cat3Id: item.id
            }, () => {
                this.props.onChange({
                    cat1Id: this.state.data[0].id,
                    cat2Id: this.state.cat2Id,
                    cat3Id: this.state.cat3Id
                });
            });
        }

    }

    renderHeader = (data) => {
        const { cat2Id, show } = this.state;
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
                {cat2Id == item.id && show ? <View className='accordion-body'>
                    {this.renderItems(item.child)}
                </View> : null}
            </View>
        })
    }

    renderItems = (data) => {
        const { cat3Id } = this.state;

        return data.map((item) => {
            const hasSelected = item.level == 3 && cat3Id == item.id;
            return <View key={item.id} hoverStyle={hoverStyle} className='accordion-item' onClick={() => {
                this.setCatId(item)
            }}
            >
                <View
                    className={hasSelected ? 'accordion-item-icon-active' : 'accordion-item-icon'}
                />
                <Text className={hasSelected ? "accordion-item-txt-active" : 'accordion-item-txt'}>{item.name}</Text>
            </View>
        })
    }

    render() {
        const { data } = this.state;
        return (
            <ScrollView className='accordion'>
                {data[0] && data[0].child ? this.renderHeader(data[0].child) : null}
            </ScrollView>
        )
    }
}
