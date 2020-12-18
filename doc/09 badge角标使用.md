# 组件含义说明

在元素右上角展示消息提醒，可用于按钮等组件。

# 属性说明

|             | 返回值类型   | 默认值 | 必填              | 说明         |
| ----------- | ------------ | ------ | ----------------- | ------------ |
| custom      | boolean      | false  | 否                | 是否定制角标 |
| renderBadge | Taro.element | -      | cutom为true时必填 | 定制的角标   |
| rnStyle     | -            | -      | 否                |              |
|             |              |        |                   |              |



# 示例说明

```
/* eslint-disable taro/render-props */
import Taro, { Component } from "@tarojs/taro";
import { View, Button, SwiperItem, Image } from "@tarojs/components";
import { Badge } from '@/components';

const badgeImg = 'https://img10.360buyimg.com/imagetools/jfs/t1/148103/10/5311/6014/5f34ef8fEdf8161fa/62ffeeafea1095df.png';

class Demo extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {  
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

    /**
     * rnStyle为设置rn端组件样式，rn端样式是以标准屏为标准, Taro本身是以2倍屏为标准
     * 所以在class中设置为10px rnStyle中设置为5
     * @returns
     */
    renderBadge = () => {
        const customBadge = (
            <View >
                <Image src={badgeImg} style={{ width: 30, height: 30}} />
            </View>
        )
        return (
            <Badge 
                value={1000} 
                badge-cls='badge-cls' 
                rnStyle={{ marginTop: 30 }} 
                // eslint-disable-next-line taro/render-props
                renderBadge={customBadge}
                custom
            >
                <Button type='primary'>角标按钮</Button>
            </Badge>
        )
    }



    render() {
        return (
            <View>
                { this.renderBadge()}
            </View>
        );
    }
}

export default Demo;

```

