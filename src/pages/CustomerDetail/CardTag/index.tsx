import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

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
            duration: 1500
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
                            src="https://img14.360buyimg.com/imagetools/jfs/t1/148500/13/7886/4132/5f58ac4eEf4738aaa/4fdb10cd71bf35e3.png"
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
                        <Image className='head-right-icon' src="https://img11.360buyimg.com/imagetools/jfs/t1/112898/10/17386/543/5f58ac4dEb76984c6/fd46e9d2b0230023.png" />
                    </View>
                </View>
                <View className='tag-body'>
                    {this.renderItems()}
                </View>
            </View>
        );
    }
}
