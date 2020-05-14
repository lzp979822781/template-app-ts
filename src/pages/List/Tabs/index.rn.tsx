/* eslint-disable react/no-multi-comp */

import Taro, { Component } from '@tarojs/taro';
import { ScrollView, Text, View } from 'react-native';
import { Tabs } from '@ant-design/react-native';

const renderContent = (tab, index) => {
    const style = {
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#ddd',
    };

    const content = [1, 2, 3, 4, 5, 6, 7, 8].map(i => {
        return (
            <View key={`${index}_${i}`} style={style}>
                <Text>
                    {tab.title} - {i}
                </Text>
            </View>
        );
    });

    return <ScrollView style={{ backgroundColor: '#fff' }}>{content}</ScrollView>;
};

class JDTabs extends Component<any, any> {
    static defaultProps = {
        initialPage: 0,
        height: "auto",
        tabList: [
            { title: 'First Tab' },
            { title: 'Second Tab' },
            { title: 'Third Tab' }
        ],
        onChange: (value) => { console.log(value) }
    };

    constructor(props: any) {
        super(props);
        this.state = {
            current: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(value) {
        this.props.onChange(value)
        this.setState({
            current: value.index
        })
    }

    render() {
        return <View style={{ height: this.props.height }}>
            <Tabs tabs={this.props.tabList} initialPage={1} tabBarPosition='top'>
                {renderContent}
            </Tabs>
        </View>
    }
}

export default JDTabs as ComponentClass<PageOwnProps, PageState>;