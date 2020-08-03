
import { StyleSheet, Dimensions } from 'react-native'

// 一般app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 375

function scalePx2dp (uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}

export default StyleSheet.create({
  "order-state-image": {
    "width": scalePx2dp(22),
    "height": scalePx2dp(24)
  },
  "my-info-user": {
    "paddingLeft": scalePx2dp(10)
  },
  "order-state-content": {
    "height": scalePx2dp(12),
    "marginTop": scalePx2dp(8),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "order-state-content-text": {
    "fontSize": scalePx2dp(12),
    "color": "#666666",
    "fontFamily": "PingFangSC-Regular",
    "lineHeight": scalePx2dp(15)
  },
  "order-state-badge": {
    "width": scalePx2dp(16),
    "height": scalePx2dp(16),
    "borderRadius": scalePx2dp(8),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "order-state-badge-text": {
    "fontSize": scalePx2dp(10),
    "color": "#fff",
    "fontFamily": "PingFangSC-Medium",
    "lineHeight": scalePx2dp(13)
  },
  "order-state-gradient": {
    "width": scalePx2dp(16),
    "height": scalePx2dp(16),
    "borderRadius": scalePx2dp(8),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "order-state-gradient-text": {
    "fontSize": scalePx2dp(10),
    "color": "#fff",
    "fontFamily": "PingFangSC-Medium",
    "lineHeight": scalePx2dp(13)
  },
  "grid-item": {
    "width": scalePx2dp(125),
    "height": scalePx2dp(80)
  },
  "grid-item-icon-wrapper": {
    "marginTop": scalePx2dp(10),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "grid-item-icon-img": {
    "width": scalePx2dp(40),
    "height": scalePx2dp(40)
  },
  "grid-item-content": {
    "marginTop": scalePx2dp(5),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "grid-item-content-text": {
    "fontSize": scalePx2dp(12),
    "color": "#666666",
    "fontFamily": "PingFangSC-Regular",
    "lineHeight": scalePx2dp(15)
  },
  "grid-item-gradient": {
    "width": scalePx2dp(40.5),
    "height": scalePx2dp(16),
    "borderRadius": scalePx2dp(8),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "grid-item-gradient-text": {
    "fontSize": scalePx2dp(10),
    "color": "#fff",
    "fontFamily": "PingFangSC-Medium",
    "lineHeight": scalePx2dp(13)
  },
  "grid-item-badge-text": {
    "top": "-4.5px !important",
    "right": "-22.5px !important"
  },
  "grid-item-badge-text-rn": {
    "top": scalePx2dp(-4.5),
    "right": scalePx2dp(-22.5)
  },
  "bg": {
    "backgroundColor": "#fff"
  },
  "grid": {
    "backgroundColor": "#fff",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-start",
    "flexWrap": "wrap"
  },
  "my": {
    "minHeight": scalePx2dp(1000),
    "backgroundColor": "#ECECEE"
  },
  "my-info": {
    "position": "relative",
    "height": scalePx2dp(110)
  },
  "my-info-container": {
    "zIndex": 10,
    "position": "absolute",
    "top": scalePx2dp(25),
    "marginLeft": scalePx2dp(15),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-start"
  },
  "order-state": {
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "my-info-user-name": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "marginTop": scalePx2dp(10)
  },
  "my-info-user-name-text": {
    "fontSize": scalePx2dp(15),
    "color": "#fff",
    "fontFamily": "PingFangSC-Semibold"
  },
  "my-info-user-department": {
    "width": scalePx2dp(75),
    "height": scalePx2dp(18),
    "marginTop": scalePx2dp(10),
    "borderRadius": scalePx2dp(9),
    "borderWidth": scalePx2dp(0.5),
    "borderStyle": "solid",
    "borderColor": "#fff",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "my-info-user-department-text": {
    "fontSize": scalePx2dp(11),
    "color": "#fff",
    "fontFamily": "PingFangSC-Regular"
  },
  "my-info-avatar": {
    "width": scalePx2dp(70),
    "height": scalePx2dp(70),
    "borderRadius": scalePx2dp(35)
  },
  "my-info-img": {
    "width": scalePx2dp(70),
    "height": scalePx2dp(70)
  },
  "my-info-bg": {
    "position": "absolute",
    "height": "100%",
    "width": "100%",
    "zIndex": 1,
    "top": 0,
    "left": 0,
    "minHeight": scalePx2dp(70)
  },
  "my-info-setting-wrapper": {
    "position": "absolute",
    "width": scalePx2dp(26),
    "height": scalePx2dp(26),
    "top": scalePx2dp(11),
    "right": scalePx2dp(60),
    "zIndex": 10
  },
  "my-info-setting-img": {
    "width": scalePx2dp(26),
    "height": scalePx2dp(26)
  },
  "my-info-message-wrapper": {
    "position": "absolute",
    "width": scalePx2dp(26),
    "height": scalePx2dp(26),
    "top": scalePx2dp(11),
    "right": scalePx2dp(10),
    "zIndex": 10
  },
  "my-info-message-img": {
    "width": scalePx2dp(22),
    "height": scalePx2dp(22)
  },
  "my-order": {
    "height": scalePx2dp(45),
    "paddingTop": 0,
    "paddingRight": scalePx2dp(10),
    "paddingBottom": 0,
    "paddingLeft": scalePx2dp(10),
    "backgroundColor": "#fff",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "my-order-title-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "my-order-title-text": {
    "fontSize": scalePx2dp(15),
    "color": "#333333",
    "fontFamily": "PingFangSC-Regular"
  },
  "my-order-desc-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "my-order-desc-text": {
    "fontSize": scalePx2dp(14),
    "color": "#666666",
    "fontFamily": "PingFangSC-Regular"
  },
  "my-order-desc-icon": {
    "width": scalePx2dp(6.5),
    "height": scalePx2dp(11.5),
    "marginLeft": scalePx2dp(4)
  },
  "my-order-empty": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "my-order-state": {
    "marginTop": scalePx2dp(0.5),
    "paddingTop": scalePx2dp(15),
    "paddingRight": 0,
    "paddingBottom": scalePx2dp(11),
    "paddingLeft": 0,
    "backgroundColor": "#fff",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-around",
    "alignItems": "center"
  },
  "my-grid": {
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
