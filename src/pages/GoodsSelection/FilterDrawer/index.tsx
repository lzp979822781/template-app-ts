import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { SafeAreaView, StyleSheet } from 'react-native';
import AlphabetList from "react-native-section-alphabet-list";
import { StatusBar, Header, Footer } from "@/components/index";
import { hoverStyle } from "@/utils/utils";
import sampleData from './sampleData';
import "./index.scss";

type dataObject = {
    [key: string]: any;
};

type baseProps = {
    data?: dataObject;
}

const colors = {
    background: {
        light: 'white',
        dark: '#FFFFFF',
    },

    seperatorLine: '#FFFFFF',

    text: {
        dark: '#1c1b1e',
    },

    primary: '#5F5F6B',
};

const sizes = {
    itemHeight: 40,
    headerHeight: 30,

    spacing: {
        regular: 15,
    },
};


export default class Filter extends Component<baseProps, any> {
    static defaultProps = {
        data: {},
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { value: 'Albania', key: 'AL' },
                { value: 'Canada', key: 'CA' },
                { value: 'Benin', key: 'BJ' },
                { value: 'Guinea', key: 'GN' },
                { value: 'Ethiopia', key: 'ET' },
                { value: 'Azerbaijan', key: 'AZ' },
                { value: 'Bermuda', key: 'BM' },
                { value: 'Greece', key: 'GR' },
                { value: 'Hong Kong', key: 'HK' },
                { value: 'Hungary', key: 'HU' },
                { value: 'India', key: 'IN' },
                { value: 'Ireland', key: 'IE' },
                { value: 'Dominica', key: 'DM' },
                { value: 'Jamaica', key: 'JM' },
                { value: 'Mexico', key: 'MX' },
                { value: 'Lithuania', key: 'LT' },
                { value: 'Luxembourg', key: 'LU' },
                { value: 'New Zealand', key: 'NZ' },
                { value: 'Portugal', key: 'PT' },
                { value: 'Japan', key: 'JP' },
                { value: 'France', key: 'FR' },
                { value: 'Egypt', key: 'EG' },
                { value: 'Finland', key: 'FI' },
                { value: 'China', key: 'CN' },
                { value: 'Denmark', key: 'DK' }
            ]
        }
    }

    renderLeft = () => {
        return <View className='back-btn'>
            <View
                className='back-btn-con'
                hoverStyle={hoverStyle}
            >
                <Image className='back-img' src='https://img11.360buyimg.com/imagetools/jfs/t1/140989/12/8055/459/5f58ac4fE8aa0f2c7/8121a8647fb70c46.png' />
            </View>
        </View>
    }

    renderListItem = (item) => {
        return (
            <View style={styles.listItemContainer}>
                <Text style={styles.listItemLabel}>{item.value}</Text>
            </View>
        );
    };

    renderSectionHeader = (section) => {
        return (
            <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
            </View>
        );
    };

    render() {
        return (
            <View className='filter-drawer'>
                <StatusBar noBgColor />
                <Header
                    renderLeft={this.renderLeft()}
                    noBgColor
                    titleColor='#444444'
                    title='店铺'
                />
                <SafeAreaView style={styles.container}>
                    <AlphabetList
                        style={{ flex: 1 }}
                        data={sampleData}
                        renderItem={this.renderListItem}
                        renderSectionHeader={this.renderSectionHeader}
                        getItemHeight={() => sizes.itemHeight}
                        sectionHeaderHeight={sizes.headerHeight}
                        indexLetterColor={colors.primary}
                    />
                </SafeAreaView>
            </View>
        );
    }
}