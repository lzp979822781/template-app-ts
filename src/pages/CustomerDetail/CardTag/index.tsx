import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import { hoverStyle, parseUrl, debounce } from "@/utils/utils";
import "./index.scss";

type dataObject = {
    [key: string]: any;
};

type baseProps = {
    loaded: boolean;
    data: dataObject;
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
        const sortArray = ["lifeCircleTags", "rfmTags", "repurchaseCycle", "promotionSensitivity", "lbsTags"];

        const { loaded, tagsData } = this.props;
        let arrayTags = tagsData["1"] || [];
        if(tagsData["2"] && tagsData["2"].length > 0){
            arrayTags = arrayTags.concat(tagsData["2"]);
        };
        if(tagsData["3"] && tagsData["3"].length > 0){
            arrayTags = arrayTags.concat(tagsData["3"]);
        };
        
        // const newArrayTags = arrayTags.filter((item) => {
        //     return !!item.value;
        // });

        const newArrayTags = sortArray.map((itemTxt) => {
            const itemObArr = arrayTags.filter(itemObj => {
                return itemObj.key == itemTxt;
            });
            if (itemObArr[0]) {
                return itemObArr[0];
            } else {
                return {};
            };
        });



        if (arrayTags.length == 0) {
            return null;
        };

        if (newArrayTags.length === 0 && loaded) {
            return <View className='tag-none-con'><Text className='tag-list-none' >暂无数据</Text></View>
        } else if (newArrayTags.length === 0 && !loaded) {
            return <View className='tag-none-con'><Text className='tag-list-none' >--</Text></View>
        };
        
        return newArrayTags.map((item) => {
            const value = item.value || "暂无";
            const title = item.title || "--";
            return <View className='tag-item' key={item.key} onClick={this.checkAllTxt.bind(this, value)}>
                <Text numberOfLines={1} className='tag-item-txt'>{title}：{value}</Text>
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
                    {data.pin ? <View
                        className='head-right'
                        hoverStyle={hoverStyle}
                        onClick={
                            debounce(() => {
                                this.routerTo("/pages/CustomerTag/index", { pin: data.pin });
                            }, 150)
                        }
                    >
                        <Text className='head-right-txt'>全部</Text>
                        <Image className='head-right-icon' src="https://img11.360buyimg.com/imagetools/jfs/t1/112898/10/17386/543/5f58ac4dEb76984c6/fd46e9d2b0230023.png" />
                    </View> : null}
                </View>
                <View className='tag-body'>
                    {this.renderItems()}
                </View>
            </View>
        );
    }
}