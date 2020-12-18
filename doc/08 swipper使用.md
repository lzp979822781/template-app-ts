# 组件含义说明

滑块视图容器。其中只可放置 swiper-item 组件，否则会导致未定义的行为。

# 属性说明

|                      | 返回值类型            | 默认值              | 必填 | 说明                             |
| -------------------- | --------------------- | ------------------- | ---- | -------------------------------- |
| indicatorDots        | boolean               | false               | 否   | 是否显示面板指示点               |
| indicatorColor       | string                | "rgba(0, 0, 0, .3)" | 否   | 指示点颜色                       |
| indicatorActiveColor | string                | "#000000"           | 否   | 当前选中的指示点颜色             |
| autoplay             | boolean               | false               | 否   | 是否自动切换                     |
| current              | current               | 0                   | 否   | 当前所在滑块的 index             |
| onChange             | BaseEventOrigFunction | -                   | 否   | current 改变时会触发 change 事件 |
| interval             | number                | number              | 否   | 自动切换时间间隔                 |
|                      |                       |                     |      |                                  |



# 示例说明

```
/* eslint-disable taro/render-props */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Swiper, SwiperItem, Image } from "@tarojs/components";

interface PageOwnState {
    show: boolean
}

class Demo extends Component<any, PageOwnState> {
    constructor(props) {
        super(props);
        this.state = {  
            show: false
        };
    }

    renderSwipperItem = () => {
        const data = [ 
            { backgroundColor: 'red', url: 'https://imgcps.jd.com/ling4/4635736/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5c17126882acdd181dd53ce0/95c21515/cr_1125x549_0_72/s1125x690/q70.jpg' },
            { backgroundColor: 'green', url: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/30451/34/12138/108202/5cb7720aE6ebf11ec/9945f5b3b9f9547f.jpg!cr_1125x549_0_72!q70.jpg.dpg' }, 
            { backgroundColor: 'blue', url: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/54392/1/2538/95587/5d064ea3E74ca0763/dc1d10fbd105d8a0.jpg!cr_1125x549_0_72!q70.jpg.dpg'}
        ];
        return data.map((item, index) => {
            const { url } = item;
            return (
                <SwiperItem className='swipper-item' key={index}>
                    <Image src={url} />
                </SwiperItem>
            )
        })
    }


    render() {
        return (
            <View>
                <Swiper
                    className='swipper-container'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    interval={2000}
                    autoplay
                    // onChange={(event) => { console.log('Swiper: onChange', event.detail.current) }}
                >
                    { this.renderSwipperItem()}
                </Swiper>

            </View>
        );
    }
}

export default Demo;
```

