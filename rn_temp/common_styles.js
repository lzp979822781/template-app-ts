
import { StyleSheet, Dimensions } from 'react-native'

// 一般app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 375

function scalePx2dp (uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}

export default StyleSheet.create({
  "border": {
    "borderWidth": scalePx2dp(0.5),
    "borderColor": "#E3E8EE",
    "borderStyle": "solid",
    "borderTopWidth": 0,
    "borderLeftWidth": 0,
    "borderRightWidth": 0
  },
  "search-list-item": {
    "borderWidth": scalePx2dp(0.5),
    "borderColor": "#E3E8EE",
    "borderStyle": "solid",
    "borderTopWidth": 0,
    "borderLeftWidth": 0,
    "borderRightWidth": 0,
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "height": scalePx2dp(50)
  },
  "search-list-item-first": {
    "borderWidth": scalePx2dp(0.5),
    "borderColor": "#E3E8EE",
    "borderStyle": "solid",
    "borderTopWidth": 0,
    "borderLeftWidth": 0,
    "borderRightWidth": 0,
    "height": scalePx2dp(50),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "flex-row-center": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "search-header": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "width": scalePx2dp(270),
    "height": scalePx2dp(32),
    "borderRadius": scalePx2dp(16),
    "backgroundColor": "#F4F6FB"
  },
  "search-icon": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "flex-end",
    "paddingLeft": scalePx2dp(10)
  },
  "search-scan": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "width": scalePx2dp(32),
    "height": "100%",
    "borderRadius": 0,
    "zIndex": 1,
    "paddingLeft": scalePx2dp(4)
  },
  "search-speech": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "width": scalePx2dp(32)
  },
  "search-input": {
    "height": scalePx2dp(32),
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0,
    "fontSize": scalePx2dp(13),
    "color": "#333840",
    "fontFamily": "PingFangSC-Regular",
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "backgroundColor": "#F4F6FB",
    "width": scalePx2dp(270),
    "borderRadius": scalePx2dp(16)
  },
  "search-input-placeholder": {
    "fontSize": scalePx2dp(13),
    "color": "#989CA5",
    "fontFamily": "PingFangSC-Regular"
  },
  "search-icon-image": {
    "width": scalePx2dp(12.5),
    "height": scalePx2dp(12.5),
    "marginRight": scalePx2dp(5.5)
  },
  "search-scan-image": {
    "width": scalePx2dp(15),
    "height": scalePx2dp(15)
  },
  "search-speech-image": {
    "width": scalePx2dp(12),
    "height": scalePx2dp(17.5)
  },
  "modal-footer": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "modal-container": {
    "display": "flex",
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "modal-default-header": {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingTop": scalePx2dp(14),
    "paddingRight": scalePx2dp(5),
    "paddingBottom": scalePx2dp(14),
    "paddingLeft": scalePx2dp(5),
    "borderBottomWidth": scalePx2dp(0.25),
    "borderBottomColor": "#E5E5E5"
  },
  "modal-default-header-text": {
    "fontSize": scalePx2dp(16)
  },
  "pop-rn-header": {
    "position": "relative",
    "paddingTop": scalePx2dp(15),
    "paddingRight": 0,
    "paddingBottom": scalePx2dp(15),
    "paddingLeft": 0,
    "textAlign": "center"
  },
  "close-img": {
    "position": "absolute",
    "right": 0,
    "top": scalePx2dp(18),
    "width": scalePx2dp(18),
    "height": scalePx2dp(18)
  },
  "pop-new-header": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "paddingTop": scalePx2dp(18)
  },
  "pop-new-header-title": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0,
    "textAlign": "center",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "pop-new-header-image": {
    "width": scalePx2dp(18),
    "height": scalePx2dp(18)
  },
  "badge": {
    "display": "flex",
    "flexDirection": "row",
    "position": "relative"
  },
  "badge-text": {
    "position": "absolute",
    "paddingTop": 0,
    "paddingRight": scalePx2dp(5),
    "paddingBottom": 0,
    "paddingLeft": scalePx2dp(5),
    "top": scalePx2dp(-9.8),
    "backgroundColor": "#FF4949",
    "borderRadius": scalePx2dp(9.8),
    "color": "#FFF",
    "right": scalePx2dp(-15),
    "overflow": "hidden",
    "zIndex": 1
  },
  "badge-dot": {
    "position": "absolute",
    "right": scalePx2dp(-3),
    "top": scalePx2dp(-3),
    "width": scalePx2dp(10),
    "height": scalePx2dp(10),
    "borderRadius": scalePx2dp(5),
    "overflow": "hidden",
    "backgroundColor": "#FF4949"
  },
  "badge-custom-text": {
    "position": "absolute",
    "top": scalePx2dp(-8),
    "right": scalePx2dp(-8)
  },
  "gradient-badge-text": {
    "fontSize": scalePx2dp(10),
    "color": "#fff",
    "fontFamily": " PingFangSC-Medium",
    "lineHeight": scalePx2dp(13)
  },
  "drawer-weapp": {
    "borderRadius": scalePx2dp(16)
  },
  "search-item": {
    "paddingTop": 0,
    "paddingRight": scalePx2dp(15),
    "paddingBottom": 0,
    "paddingLeft": scalePx2dp(15),
    "borderRadius": scalePx2dp(16),
    "height": scalePx2dp(32),
    "backgroundColor": "#F4F6FB",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "marginTop": scalePx2dp(10),
    "marginRight": scalePx2dp(10),
    "marginBottom": 0,
    "marginLeft": 0
  },
  "search-item-hot": {
    "width": scalePx2dp(16),
    "height": scalePx2dp(16),
    "borderRadius": scalePx2dp(5),
    "marginLeft": scalePx2dp(5),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "search-item-hot-text": {
    "fontSize": scalePx2dp(10),
    "color": "#fff",
    "fontFamily": "PingFangSC-Regular"
  },
  "search-item-text": {
    "fontSize": scalePx2dp(14),
    "color": "#333840",
    "fontFamily": "PingFangSC-Regular"
  },
  "hot": {
    "marginTop": scalePx2dp(20),
    "paddingTop": scalePx2dp(5),
    "paddingRight": scalePx2dp(5),
    "paddingBottom": scalePx2dp(5),
    "paddingLeft": scalePx2dp(15)
  },
  "hot-header": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "flexWrap": "wrap",
    "marginBottom": scalePx2dp(5)
  },
  "hot-header-text": {
    "fontSize": scalePx2dp(16),
    "color": "#333840",
    "fontFamily": "PingFangSC-Semibold"
  },
  "hot-header-img": {
    "marginLeft": scalePx2dp(5),
    "width": scalePx2dp(16),
    "height": scalePx2dp(16),
    "borderRadius": 0
  },
  "hot-content": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "flexWrap": "wrap"
  },
  "scrollview": {
    "height": scalePx2dp(600)
  },
  "search-list-item-text": {
    "fontSize": scalePx2dp(15),
    "color": "#151A1C",
    "fontFamily": "PingFangSC-Regular"
  },
  "search-list-item-highlight": {
    "color": "#4381E5"
  },
  "search-list-item-first-img": {
    "width": scalePx2dp(15),
    "height": scalePx2dp(14),
    "borderRadius": 0
  },
  "search-list-item-first-text": {
    "marginLeft": scalePx2dp(10)
  },
  "search-input-icon": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "flex-end",
    "paddingLeft": scalePx2dp(10)
  },
  "search-input-icon-image": {
    "width": scalePx2dp(12.5),
    "height": scalePx2dp(12.5),
    "marginRight": scalePx2dp(5.5)
  },
  "search-input-content": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "search-input-content-text": {
    "fontSize": scalePx2dp(13),
    "color": "#333840",
    "fontFamily": "PingFangSC-Regular"
  },
  "search-select": {
    "paddingTop": 0,
    "paddingRight": scalePx2dp(15),
    "paddingBottom": 0,
    "paddingLeft": scalePx2dp(15)
  },
  "search-select-good": {
    "height": scalePx2dp(44),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "search-select-good-price": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "search-select-good-price-icon": {
    "marginLeft": scalePx2dp(5),
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "search-select-good-price-icon-high": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "flex-end"
  },
  "search-select-good-price-icon-high-img": {
    "width": scalePx2dp(8),
    "height": scalePx2dp(4),
    "borderRadius": 0
  },
  "search-select-good-price-icon-low": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "flex-start",
    "marginTop": scalePx2dp(3)
  },
  "search-select-good-price-icon-low-img": {
    "width": scalePx2dp(8),
    "height": scalePx2dp(4),
    "borderRadius": 0
  },
  "search-select-text-common": {
    "fontSize": scalePx2dp(14),
    "color": "#333840",
    "fontFamily": "PingFangSC-Regular"
  },
  "service-item": {
    "borderWidth": scalePx2dp(0.5),
    "borderStyle": "solid",
    "borderColor": "#DCE3F0",
    "borderRadius": scalePx2dp(16),
    "height": scalePx2dp(31.5),
    "width": scalePx2dp(81.5),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "service-item-text": {
    "fontSize": scalePx2dp(13),
    "color": "#5F5F6B",
    "fontFamily": "PingFangSC-Regular"
  },
  "service-item-text-active": {
    "fontSize": scalePx2dp(13),
    "color": "#4381E5",
    "fontFamily": "PingFangSC-Medium"
  },
  "service-item-active": {
    "borderColor": "#4381E5"
  },
  "price": {
    "width": scalePx2dp(122.5),
    "height": scalePx2dp(32),
    "borderRadius": scalePx2dp(16),
    "backgroundColor": "#F4F6FB",
    "textAlign": "center",
    "paddingTop": 0,
    "paddingRight": scalePx2dp(16),
    "paddingBottom": 0,
    "paddingLeft": scalePx2dp(16),
    "fontSize": scalePx2dp(13),
    "color": "#333840",
    "fontFamily": "PingFangSC-Semibold"
  },
  "price-placeholder": {
    "fontSize": scalePx2dp(13),
    "color": "#989CA5",
    "fontFamily": "PingFangSC-Regular",
    "textAlign": "center"
  },
  "search-drawer": {
    "display": "flex",
    "flexDirection": "column",
    "height": "100%"
  },
  "search-drawer-service": {
    "paddingTop": scalePx2dp(25),
    "paddingRight": scalePx2dp(20),
    "paddingBottom": scalePx2dp(25),
    "paddingLeft": scalePx2dp(20),
    "backgroundColor": "#fff"
  },
  "search-drawer-service-text": {
    "fontSize": scalePx2dp(16),
    "color": "#333840",
    "fontFamily": "PingFangSC-Semibold"
  },
  "search-drawer-service-content": {
    "marginTop": scalePx2dp(15),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "flex-start",
    "flexWrap": "wrap"
  },
  "search-drawer-service-price": {
    "marginTop": scalePx2dp(25)
  },
  "search-drawer-service-price-content": {
    "marginTop": scalePx2dp(15),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "search-drawer-service-price-delimiter": {
    "width": scalePx2dp(10),
    "height": scalePx2dp(1),
    "marginTop": 0,
    "marginRight": scalePx2dp(5),
    "marginBottom": 0,
    "marginLeft": scalePx2dp(5),
    "backgroundColor": "#5F5F6B"
  },
  "search-drawer-btns": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0,
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-end",
    "backgroundColor": "#fff"
  },
  "search-drawer-btns-btn": {
    "height": scalePx2dp(42),
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0,
    "width": scalePx2dp(152.5),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "search-drawer-btns-gradient": {},
  "search-drawer-btns-reset": {
    "borderBottomLeftRadius": scalePx2dp(12),
    "fontSize": scalePx2dp(16),
    "color": "#4381E5",
    "fontFamily": "PingFangSC-Semibold"
  },
  "search-drawer-btns-sure-text": {
    "fontSize": scalePx2dp(16),
    "color": "#fff",
    "fontFamily": "PingFangSC-Semibold"
  },
  "search-drawer-condition": {
    "marginTop": scalePx2dp(10)
  },
  "mt20": {
    "marginTop": scalePx2dp(10)
  },
  "at-drawer__content": {
    "borderTopLeftRadius": scalePx2dp(12),
    "borderBottomLeftRadius": scalePx2dp(12)
  },
  "at-drawer__mask": {
    "backgroundColor": "rgba(51, 56, 64, 0.7)"
  }
})
