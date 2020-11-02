/* eslint-disable @typescript-eslint/no-use-before-define */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { SafeAreaView, SectionList, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { StatusBar, Header, Footer } from "@/components/index";
import { hoverStyle } from "@/utils/utils";
import "./index.scss";
// import sampleData from './sampleData';

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

type baseProps = {
    data: ReadonlyStringArray;
    onOk: any;
    closeDrawer: any;
}

export default class Filter extends Component<baseProps, any> {
    static defaultProps = {
        data: [],
        onOk: () => {
        },
        closeDrawer: () => {
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            actLetter: "a",
            selected: ""
        }
    }

    sectionList: any;

    timer: NodeJS.Timeout;

    tapToSection: boolean;

    renderLeft = () => {
        return <View className='drawer-back-btn'>
            <View
                className='drawer-back-btn-con'
                hoverStyle={hoverStyle}
                onClick={this.props.closeDrawer}
            >
                <Image className='drawer-back-img' src='https://img10.360buyimg.com/imagetools/jfs/t1/152491/18/629/2149/5f6b1ee5Eb04c738f/4cb9bbf205a4fca0.png' />
            </View>
        </View>
    }

    selectItem = (item) => {
        // const { selected } = this.state;
        // if (selected.includes(item)) {
        //     const index = selected.indexOf(item);
        //     selected.splice(index, 1)
        // } else {
        //     selected.push(item)
        // };

        this.setState({ selected: item })
    }

    renderListItem = ({ item }) => {
        const { selected } = this.state;
        let itemTxt = [styles.itemTxt];
        const boolSelected = selected.includes(item);
        if (boolSelected) {
            itemTxt = [styles.itemTxt, styles.itemTxtAct];
        };

        return <TouchableOpacity onPress={() => { this.selectItem(item) }}>
            <View style={styles.item}>
                <Text style={itemTxt}>{item}</Text>
                {boolSelected ? <Image
                    className='list-item-selected'
                    mode='aspectFit'
                    src='https://img10.360buyimg.com/imagetools/jfs/t1/136799/28/11775/633/5f811591Ed2430b7b/8ce3394b7bde2f47.png'
                /> : null}
            </View>
        </TouchableOpacity>
    }

    renderSectionHeader = ({ section: { title } }) => {
        const { actLetter } = this.state;

        let headerTxt = [styles.headerTxt];
        if (actLetter.toLocaleUpperCase() == title.toLocaleUpperCase()) {
            headerTxt = [styles.headerTxt, styles.headerTxtAct];
        };

        return <View style={styles.header}>
            <Text style={headerTxt}>{title}</Text>
        </View>
    }



    renderLetterItem = ({ item, index }) => {

        const { actLetter } = this.state;

        let itemCom = [styles.letterIndexItem];
        let itemTxt = [styles.letterIndexLabel];
        if (item.title == actLetter) {
            itemCom = [styles.letterIndexItem, styles.letterIndexItemAct];
            itemTxt = [styles.letterIndexLabel, styles.letterIndexLabelAct];
        };

        return (
            <TouchableOpacity onPress={() => { this.onScrollToSection(index, item.title) }}>
                <View style={itemCom}>
                    <Text style={itemTxt}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    onScrollToSection = (sectionIndex: number, actLetter: string) => {
        if (!this.sectionList) {
            return;
        };
        this.tapToSection = true;
        this.setState({ actLetter: actLetter }, () => {
            this.sectionList.scrollToLocation({
                sectionIndex,
                itemIndex: 0,
                viewOffset: Platform.OS === 'ios' ? 0 : 49
            });
        });
    };

    onSetSectionListRef = (sectionList: SectionList) => {
        if (!sectionList) {
            return;
        }
        this.sectionList = sectionList;
    };

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        const { actLetter } = this.state;
        // console.log(viewableItems);
        let key = "";

        if (viewableItems[0]["section"] && viewableItems[0]["section"]["title"]) {
            key = viewableItems[0]["section"]["title"];
        };

        if (key == actLetter || this.tapToSection) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.tapToSection = false;
            }, 300);
            return;
        } else {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.setState({ actLetter: key })
            }, 300);
        }
    }

    reset = () => {
        const { onOk } = this.props;
        onOk("");
        this.setState({ selected: "" })
    }

    onOk = () => {
        const { selected } = this.state;
        const { onOk } = this.props;
        onOk(selected);
    }

    render() {
        const { data } = this.props;
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
                    <SectionList
                        stickySectionHeadersEnabled={false}
                        ref={this.onSetSectionListRef}
                        sections={data}
                        keyExtractor={(item, index) => item + index}
                        onViewableItemsChanged={this.onViewableItemsChanged}
                        renderItem={this.renderListItem}
                        renderSectionHeader={this.renderSectionHeader}
                    />
                    <View style={styles.letterIndexContainer}>
                        <FlatList
                            extraData={this.state.actLetter}
                            contentContainerStyle={styles.letterIndexList}
                            data={data}
                            renderItem={this.renderLetterItem}
                            keyExtractor={(i) => i.title}
                        />
                    </View>
                </SafeAreaView>
                <View className="select-btn">
                    <View className="select-btn-reset" hoverStyle={hoverStyle} onClick={this.reset}>
                        <Text className="select-btn-reset-txt">重置</Text>
                    </View>
                    <View className="select-btn-confirm" hoverStyle={hoverStyle} onClick={this.onOk}>
                        <Text className="select-btn-confirm-txt">确定</Text>
                    </View>
                </View>
                <Footer></Footer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingRight: 30
    },
    item: {
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#FFFFFF",
        height: 50,
        paddingLeft: 20,
        flexDirection: "row"
    },
    itemTxt: {
        fontSize: 15,
        color: "#5F5F6B",
    },
    itemTxtAct: {
        color: "#F23030",
    },
    header: {
        alignItems: "flex-start",
        justifyContent: "center",
        height: 50,
        paddingLeft: 20
    },
    headerTxt: {
        fontSize: 16,
        color: "#5F5F6B",
        fontWeight: "700"
    },
    headerTxtAct: {
        color: "#F23030"
    },
    letterIndexContainer: {
        width: 20,
        height: "100%",
        position: "absolute",
        top: 0,
        right: 4,
    },
    letterIndexList: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#FFFFFF",
    },
    letterIndexItem: {
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    letterIndexItemAct: {
        backgroundColor: "#F23030",
        borderRadius: 10
    },
    letterIndexLabel: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#5F5F6B"
    },
    letterIndexLabelAct: {
        color: "#FFFFFF"
    }
});