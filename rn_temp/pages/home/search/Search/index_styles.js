
import { StyleSheet, Dimensions } from 'react-native'

// 一般app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 375

function scalePx2dp (uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}

export default StyleSheet.create({
  "search-list-header-back": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "paddingTop": 0,
    "paddingRight": scalePx2dp(24),
    "paddingBottom": 0,
    "paddingLeft": scalePx2dp(15)
  },
  "search-history": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "flexWrap": "wrap",
    "paddingLeft": scalePx2dp(15)
  },
  "search-list-header-back-icon": {
    "width": scalePx2dp(8.5),
    "height": scalePx2dp(17),
    "borderRadius": 0
  },
  "search-list-header-btn": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingLeft": scalePx2dp(15)
  },
  "search-list-header-btn-text": {
    "fontSize": scalePx2dp(14),
    "color": "#5F5F6B",
    "fontFamily": "PingFangSC-Regular"
  },
  "search-list-body": {
    "paddingLeft": scalePx2dp(15)
  },
  "search-list-header": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "height": scalePx2dp(44)
  },
  "search-history-header": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "paddingTop": scalePx2dp(5),
    "paddingRight": scalePx2dp(15),
    "paddingBottom": scalePx2dp(5),
    "paddingLeft": scalePx2dp(15),
    "marginTop": scalePx2dp(20.5)
  },
  "search-history-header-text": {
    "fontSize": scalePx2dp(16),
    "color": "#333840",
    "fontFamily": "PingFangSC-Semibold",
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "search-history-header-img": {
    "width": scalePx2dp(16),
    "height": scalePx2dp(16)
  },
  "search-history-tail": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingTop": scalePx2dp(15),
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0
  },
  "search-history-tail-text": {
    "fontSize": scalePx2dp(12),
    "color": "#5F5F6B",
    "fontFamily": "PingFangSC-Semibold",
    "marginRight": scalePx2dp(5)
  },
  "search-history-tail-img": {
    "width": scalePx2dp(7),
    "height": scalePx2dp(4),
    "borderRadius": 0
  },
  "at-drawer__content": {
    "borderTopLeftRadius": scalePx2dp(12),
    "borderBottomLeftRadius": scalePx2dp(12)
  },
  "at-drawer__mask": {
    "backgroundColor": "rgba(51, 56, 64, 0.7)"
  }
})
