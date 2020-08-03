
import { StyleSheet, Dimensions } from 'react-native'

// 一般app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 375

function scalePx2dp (uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}

export default StyleSheet.create({
  "title-title-container": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-end",
    "marginRight": scalePx2dp(4)
  },
  "wonderful-venue-maincard": {
    "marginTop": scalePx2dp(20),
    "paddingLeft": scalePx2dp(22),
    "height": scalePx2dp(130),
    "borderRadius": scalePx2dp(8),
    "backgroundColor": "#A0C8F0"
  },
  "title-title-text": {
    "fontSize": scalePx2dp(20),
    "color": "#333840",
    "fontFamily": "PingFangSC-Semibold"
  },
  "title-desc-container": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "title-desc-text": {
    "fontSize": scalePx2dp(13),
    "color": "#989CA5",
    "fontFamily": "PingFangSC-Light"
  },
  "title-more-container": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "title-more-text": {
    "fontSize": scalePx2dp(12),
    "color": "#989CA5",
    "fontFamily": "PingFangSC-Light",
    "marginRight": scalePx2dp(6)
  },
  "title-more-image": {
    "width": scalePx2dp(3),
    "height": scalePx2dp(6)
  },
  "basecard": {
    "width": scalePx2dp(168.5),
    "height": scalePx2dp(130),
    "backgroundColor": "#F7F8FB",
    "borderRadius": scalePx2dp(8),
    "paddingLeft": scalePx2dp(15)
  },
  "basecard-title-container": {
    "paddingTop": scalePx2dp(15),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-end"
  },
  "basecard-title-txt": {
    "fontSize": scalePx2dp(16),
    "color": "#333840",
    "fontFamily": "PingFangSC-Semibold",
    "marginTop": scalePx2dp(-4)
  },
  "basecard-desc-container": {
    "marginTop": scalePx2dp(8),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-end"
  },
  "basecard-desc-txt": {
    "fontSize": scalePx2dp(12),
    "color": "#989CA5",
    "fontFamily": "PingFangSC-Regular",
    "marginTop": scalePx2dp(-7)
  },
  "basecard-footer": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-start"
  },
  "basecard-footer-container": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0,
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "flex-start",
    "alignItems": "flex-start"
  },
  "basecard-footer-container-container": {
    "marginTop": scalePx2dp(10),
    "width": scalePx2dp(31),
    "height": scalePx2dp(16),
    "borderRadius": scalePx2dp(16),
    "backgroundColor": "#4381E5",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "basecard-footer-container-txt": {
    "fontSize": scalePx2dp(11),
    "color": "#fff",
    "fontFamily": "PingFangSC-Semibold"
  },
  "basecard-footer-container-icon": {
    "marginLeft": scalePx2dp(2)
  },
  "basecard-footer-container-img": {
    "width": scalePx2dp(87),
    "height": scalePx2dp(78),
    "overflow": "hidden"
  },
  "subcard": {
    "width": scalePx2dp(80),
    "height": scalePx2dp(130),
    "backgroundColor": "#F7F8FB",
    "borderRadius": scalePx2dp(8),
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "subcard-title-container": {
    "marginTop": scalePx2dp(15),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "subcard-title-txt": {
    "fontSize": scalePx2dp(14),
    "color": "#333840",
    "fontFamily": "PingFangSC-Semibold"
  },
  "subcard-desc-container": {
    "marginTop": scalePx2dp(6),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "subcard-desc-txt": {
    "fontSize": scalePx2dp(11),
    "color": "#989CA5",
    "fontFamily": "PingFangSC-Regular"
  },
  "subcard-footer": {
    "marginTop": scalePx2dp(17),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "flex-start"
  },
  "subcard-footer-image": {
    "width": scalePx2dp(36),
    "height": scalePx2dp(55)
  },
  "tag": {
    "width": scalePx2dp(22),
    "height": scalePx2dp(12),
    "borderRadius": scalePx2dp(22),
    "borderWidth": 1,
    "borderStyle": "solid",
    "borderColor": "#ED5458",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "tag-txt": {
    "fontSize": scalePx2dp(8),
    "color": "#ED5458",
    "fontFamily": "PingFangSC-Regular"
  },
  "flex-row-center": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "home-search-header": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "width": scalePx2dp(301),
    "height": scalePx2dp(34),
    "borderRadius": scalePx2dp(17),
    "backgroundColor": "rgba(255, 255, 255, 0.2)"
  },
  "home-search-icon": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "flex-end",
    "paddingLeft": scalePx2dp(21)
  },
  "home-search-scan": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "width": scalePx2dp(32)
  },
  "home-search-input": {
    "height": "100%",
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "home-search-icon-image": {
    "width": scalePx2dp(11),
    "height": scalePx2dp(11),
    "marginRight": scalePx2dp(7)
  },
  "home-search-scan-image": {
    "width": scalePx2dp(15),
    "height": scalePx2dp(15)
  },
  "wonderful-venue": {
    "paddingTop": scalePx2dp(15),
    "paddingRight": scalePx2dp(15),
    "paddingBottom": scalePx2dp(15),
    "paddingLeft": scalePx2dp(15)
  },
  "title": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "fontFamily": "PingFangSC-Semibold"
  },
  "wonderful-venue-maincard-title": {
    "fontSize": scalePx2dp(16),
    "color": "#fff",
    "fontFamily": "PingFangSC-Semibold"
  },
  "wonderful-venue-maincard-title-container": {
    "paddingTop": scalePx2dp(24)
  },
  "wonderful-venue-maincard-subtitle": {
    "fontSize": scalePx2dp(13),
    "color": "#fff",
    "fontFamily": "PingFangSC-Regular"
  },
  "wonderful-venue-maincard-btn": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "width": scalePx2dp(49),
    "height": scalePx2dp(20),
    "backgroundColor": "#80ADDD",
    "borderRadius": scalePx2dp(20),
    "marginTop": scalePx2dp(16)
  },
  "wonderful-venue-maincard-btn-txt": {
    "fontSize": scalePx2dp(11),
    "color": "#fff",
    "fontFamily": "PingFangSC-Regular"
  },
  "wonderful-venue-subcard": {
    "marginTop": scalePx2dp(8),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "flex-start"
  },
  "explosive": {
    "paddingTop": scalePx2dp(15),
    "paddingRight": scalePx2dp(15),
    "paddingBottom": scalePx2dp(15),
    "paddingLeft": scalePx2dp(15)
  },
  "explosive-subcard-container": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "marginTop": scalePx2dp(19)
  },
  "explosive-subcard-sub-container": {
    "marginTop": scalePx2dp(8),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "drug": {
    "paddingTop": scalePx2dp(32),
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-start"
  },
  "drug-image": {
    "width": scalePx2dp(96),
    "height": scalePx2dp(96)
  },
  "drug-content": {
    "paddingLeft": scalePx2dp(15),
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "drug-content-title-container": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "drug-content-title-txt": {
    "fontSize": scalePx2dp(16),
    "color": "#373D46",
    "fontFamily": "PingFangSC-Medium"
  },
  "drug-content-title-txt-container": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "width": "85%"
  },
  "drug-content-title-selfsku": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor": "#4381E5",
    "width": scalePx2dp(28),
    "height": scalePx2dp(15),
    "borderRadius": scalePx2dp(15),
    "marginRight": scalePx2dp(5)
  },
  "drug-content-title-selfsku-txt": {
    "fontSize": scalePx2dp(10),
    "color": "#fff",
    "fontFamily": "PingFangSC-Regular"
  },
  "drug-content-subtitle-container": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "marginTop": scalePx2dp(4)
  },
  "drug-content-subtitle-txt": {
    "fontSize": scalePx2dp(13),
    "color": "#5F5F6B",
    "fontFamily": "PingFangSC-Regular"
  },
  "drug-content-spec-container": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "marginTop": scalePx2dp(4)
  },
  "drug-content-spec-container-child": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "paddingTop": 0,
    "paddingRight": scalePx2dp(7),
    "paddingBottom": 0,
    "paddingLeft": scalePx2dp(7),
    "lineHeight": scalePx2dp(19),
    "height": scalePx2dp(19),
    "backgroundColor": "#F7F8FB",
    "borderRadius": scalePx2dp(19)
  },
  "drug-content-spec-txt": {
    "fontSize": scalePx2dp(11),
    "color": "#989CA5",
    "fontFamily": "PingFangSC-Regular"
  },
  "drug-content-price-container": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "marginTop": scalePx2dp(2)
  },
  "drug-content-price-txt": {
    "fontSize": scalePx2dp(18),
    "color": "#ED5458",
    "fontFamily": "Avenir-Heavy"
  },
  "drug-content-price-tag": {
    "marginLeft": scalePx2dp(4)
  },
  "drug-content-shop": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "marginTop": 0
  },
  "drug-content-shop-txt": {
    "fontSize": scalePx2dp(12),
    "color": "#5F5F6B",
    "fontFamily": "PingFangSC-Regular"
  },
  "drug-content-shop-image": {
    "width": scalePx2dp(3),
    "height": scalePx2dp(6),
    "marginLeft": scalePx2dp(6)
  },
  "header": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "paddingLeft": scalePx2dp(15),
    "height": scalePx2dp(44)
  },
  "swipper-item": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "height": scalePx2dp(215)
  },
  "home": {
    "flexDirection": "column",
    "display": "flex",
    "width": "100%",
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "home-list": {
    "backgroundColor": "#fff",
    "paddingTop": scalePx2dp(32),
    "paddingRight": scalePx2dp(15),
    "paddingBottom": 0,
    "paddingLeft": scalePx2dp(15)
  },
  "nav": {
    "backgroundColor": "#8EA7E1"
  },
  "swipper-container": {
    "height": scalePx2dp(215)
  },
  "at-drawer__content": {
    "borderTopLeftRadius": scalePx2dp(12),
    "borderBottomLeftRadius": scalePx2dp(12)
  },
  "at-drawer__mask": {
    "backgroundColor": "rgba(51, 56, 64, 0.7)"
  }
})
