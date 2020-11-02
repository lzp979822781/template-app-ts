import Taro, { Component } from "@tarojs/taro";
import classnames from 'classnames';
import { View, Image, Text } from "@tarojs/components";
import { PopUp, Gradient } from "@/components";
import { compareDate } from '@/utils/utils';

import DetailDatePicker from '../DetailDatePicker';

import './index.scss';

type pageOwnProps  = {
    showValue: string,
    visible: boolean,
    onClose?: () => any,
    onTimeSave: (param) => any
}

type pageOwnState = {
    selectField: string,
    cacheTime: string,
    cacheStart: string,
    cacheEnd: string,
}

const rnStyle = {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
};

const rnContainerStyle = {
    paddingHorizontal: 0
}

const rnBodyStyle = {
    paddingTop: 0
};

const resetShadow = {
    shadowColor: "#000000",
    shadowOffset: { w: 0, h: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
}

const prefix = 'detail-popup';
const closeSrc = 'https://img10.360buyimg.com/imagetools/jfs/t1/112244/30/18443/459/5f69b004E2b211fa2/ee92aeec83c81fa9.png';

const timeFieldObj = {
    start: 'cacheStart',
    end: 'cacheEnd'
};

class DetailPopup extends Component<pageOwnProps, pageOwnState> {
    constructor(props) {
        super(props);
        const [startDate, endDate] = props.showValue.split('-');
        this.state = {  
            selectField: 'start',
            cacheTime: props.showValue,
            cacheStart: startDate,
            cacheEnd: endDate
        };
    }

    componentWillReceiveProps(nextProps) {
        const { visible: nextVisible, showValue } = nextProps;
        const [startDate, endDate] = showValue.split('-');
        const { visible: visible } = this.props;
        if( nextVisible && !visible) {
            this.setState({
                cacheTime: showValue,
                cacheStart: startDate,
                cacheEnd: endDate
            })
        }
    }

    onReset = () => {
        this.setState({ 
            cacheTime: '',
            cacheStart: '',
            cacheEnd: '',
            selectField: 'start',
        });
        [this.startRef, this.endRef].forEach( item => {
            this.callChildMethod(item, 'reset');
        })
    }

    callChildMethod = (ref, method) => {
        if(ref && method) {
            ref[method]();
        }
    }

    scrollSet = date => {
        const { cacheStart, cacheEnd, selectField } = this.state;
        const cacheTime = selectField === 'start' ? `${date}-${cacheEnd}` : `${cacheStart}-${date}`;
        this.setState({
            cacheTime,
            [timeFieldObj[selectField]]: date
        })

    }

    onPopSave = () => {
        
        const { cacheStart, cacheEnd, cacheTime} = this.state;
        if(!compareDate(cacheStart, cacheEnd)) {
            return;
        }
        // 设置选中值
        this.saveTime(cacheTime);
        this.onChangeTimeTab('start')();
    }

    saveTime = timeValue => {
        const { onTimeSave } = this.props;
        
        if(onTimeSave) {
            onTimeSave(timeValue);
        }
    }

    /**
     * showValue格式为2020.10.15-2020.10.15
     * @param {*} field field为start表示获取的是开始时间，为end标识获取的是结束时间
     * @returns { string } 选择的开始时间或者结束时间
     */
    getSelfTime = field => {
        const { cacheTime } = this.state;
        if(!cacheTime) return '';
        const [ startTime, endTime] = cacheTime.split('-');
        return field === 'start' ? startTime : endTime;
    }

    startRef = null
    endRef = null

    setStartRef = ele => {
        this.startRef = ele;
    }

    setEndRef = ele => {
        this.endRef = ele;
    }


    renderStart = () => {
        const { selectField } = this.state;
        if(selectField !== 'start') return null;
        return (
            <DetailDatePicker 
                initDate={this.getSelfTime('start')} 
                ref={this.setStartRef}
                scrollSet={this.scrollSet}
            />
        );
    }

    renderEnd = () => {
        const { selectField } = this.state;
        if(selectField == 'start') return null;
        return (
            <DetailDatePicker 
                initDate={this.getSelfTime('end')} 
                ref={this.setEndRef}
                scrollSet={this.scrollSet}
            />
        );
    }

    onPopOpen = () => {

    }

    onPopClose = () => {
        const { showValue } = this.props;
        this.setState({ cacheTime: showValue });
        this.handlePropsMethod("onClose");
    }

    onChangeTimeTab = selectField => () => {
        this.setState({ selectField })
    }

    handlePropsMethod = (methodName: string, paramArr = []) => {
        const { [methodName]: method } = this.props;
        if(method) {
            method(...paramArr);
        }
    }

    isSelectStart = () => {
        const { selectField } = this.state;
        return selectField === 'start';
    }

    render() {
        
        const {visible = false } = this.props;
        const startText = this.getSelfTime('start');
        const endText = this.getSelfTime("end");
        const startCls = classnames(`${prefix}-text-container-content-text`, {
            [`${prefix}-text-placeholder`]: !startText
        });
        const endCls = classnames(`${prefix}-time-container-title-down-text`, {
            [`${prefix}-text-placeholder`]: !endText
        })

        const btnCls = classnames(`${prefix}-btn-container`, {
            [`${prefix}-gap`]: !startText && !endText
        })

        const textContainer = classnames(`${prefix}-text-container`, {
            [`${prefix}-text-selected`]: !this.isSelectStart()
        })
        const timeContainer = classnames(`${prefix}-time-container`, {
            [`${prefix}-text-selected`]: this.isSelectStart()
        })

        return (
            <PopUp
                visible={visible}
                rnStyle={rnStyle}
                rnBodyStyle={rnBodyStyle}
                rnContainerStyle={rnContainerStyle}
                onClose={this.onPopClose}
            >
                <View className={prefix}>
                    <View className={`${prefix}-header`} >
                        <View className={`${prefix}-header-container`} onClick={this.onPopClose}>
                            <Image className={`${prefix}-header-container-img`} src={closeSrc} />
                        </View>
                    </View>
                    <View className={`${prefix}-body`}>
                        <View className={`${prefix}-title`}>
                            <View className={textContainer} onClick={this.onChangeTimeTab('start')}>

                                <View className={`${prefix}-text-container-container`}>

                                    <View className={`${prefix}-text-container-icon`}>
                                        <Text className={`${prefix}-text-container-icon-icon`}>始</Text>
                                    </View>
                                    <Text className={`${prefix}-text-container-icon-text`}>起始日期</Text>
                                </View>

                                <View className={`${prefix}-text-container-content`}>
                                    <Text className={startCls}>{ startText || '请选择起始日期'}</Text>
                                </View>
                            </View>
                            
                            <View className={`${prefix}-body-delimiter`}>

                            </View>

                            <View className={timeContainer} onClick={this.onChangeTimeTab('end')}>
                                <View className={`${prefix}-time-container-title-up`}>
                                    <View className={`${prefix}-time-container-title-up-left`}>
                                        <Text className={`${prefix}-time-container-title-up-left-text`}>末</Text>
                                    </View>
                                    <Text className={`${prefix}-time-container-title-up-right-text`}>结束日期</Text>
                                </View>
                                <View className={`${prefix}-time-container-title-down`}>
                                    <Text className={endCls}>{endText || '请选择结束日期'}</Text>
                                </View>
                            </View>
                        </View>

                        {/* 日期选择器 */}
                        <View>
                            {this.renderStart()}
                            { this.renderEnd()}
                        </View>
                    </View>
                    <View className={btnCls}>
                        <View className={`${prefix}-btn-reset`} style={resetShadow} onClick={this.onReset}>
                            <Text className={`${prefix}-btn-reset-text`}>重置</Text>
                        </View>
                        <View 
                            className={`${prefix}-btn-ok`}
                            onClick={this.onPopSave}
                        >
                            <Gradient
                                className={`${prefix}-btn-ok`}
                                angle={0}
                                colors={["#F23030", "#FF511D"]}
                            >
                                <Text className={`${prefix}-btn-ok-text`}>确定</Text>
                            </Gradient>
                        </View>
                    </View>
                </View>
            </PopUp>
        );
    }
}

export default DetailPopup;