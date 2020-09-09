import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import arrows from "@/assets/images/arrows@3x.png";
import CustomerTagIcon from "@/assets/images/customer-tag-icon@3x.png";
import { hoverStyle, parseUrl } from "@/utils/utils";
import "./index.scss";

type baseProps = {
    data?: object;
    tagsData: object;
}

export default class CardTag extends Component<baseProps, any> {
    static defaultProps = {
        data: { customerTagRes: { shopTags: [] } },
        tagsData: {
            "1": [],
            "2": [],
            "3": []
        }
    }

    constructor(props) {
        super(props);
    }

    routerTo = (url, params) => {
        const uri = parseUrl(url, params)

        Taro.navigateTo({
            url: uri
        });
    };

    renderItems = () => {
        const tagsData = this.props.tagsData;
        let arrayTags = tagsData["1"];
        arrayTags = arrayTags.concat(tagsData["2"]);
        arrayTags = arrayTags.concat(tagsData["3"]);
        const newArrayTags = arrayTags.filter((item) => {
            return !!item.value;
        });

        if (newArrayTags.length === 0) {
            return <View className='tag-none-con'><Text className='tag-list-none' >暂无数据</Text></View>
        };

        return newArrayTags.slice(0, 5).map((item) => {
            return <View className='tag-item' key={item.key} onClick={this.checkAllTxt.bind(this, item.value)}>
                <Text numberOfLines={1} className='tag-item-txt'>{item.title}：{item.value}</Text>
            </View>
        })
    }

    checkAllTxt = (txt) => {
        Taro.showToast({
            title: txt,
            icon: "none",
            duration: 2000
        })
    }

    render() {
        const { data } = this.props;

        return (
            <View className='card-tag'>
                <View className='tag-head'>
                    <View className='head-left'>
                        <Image
                            className='tag-head-left-icon'
                            src={CustomerTagIcon}
                        />
                        <Text className='head-left-title'>客户标签</Text>
                    </View>
                    <View
                        className='head-right'
                        hoverStyle={hoverStyle}
                        onClick={() => {
                            this.routerTo("/pages/CustomerTag/index", { pin: data.pin });
                        }}
                    >
                        <Text className='head-right-txt'>全部</Text>
                        <Image className='head-right-icon' src={arrows} />
                    </View>
                </View>
                <View className='tag-body'>
                    {this.renderItems()}
                </View>
            </View>
        );
    }
}
