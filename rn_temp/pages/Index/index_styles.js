
import { StyleSheet, Dimensions } from 'react-native'

// 一般app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 375

function scalePx2dp (uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}

export default StyleSheet.create({
  "flex-row-center": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
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
  "index": {
    "flexDirection": "column",
    "display": "flex",
    "width": "100%",
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
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
