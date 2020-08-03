
import { StyleSheet, Dimensions } from 'react-native'

// 一般app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 375

function scalePx2dp (uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}

export default StyleSheet.create({
  "goods-list": {
    "height": "100%"
  },
  "goods-list-header": {
    "paddingTop": 0,
    "paddingRight": scalePx2dp(15),
    "paddingBottom": 0,
    "paddingLeft": scalePx2dp(15),
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "height": scalePx2dp(32)
  },
  "goods-list-header-back": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "paddingTop": 0,
    "paddingRight": scalePx2dp(24),
    "paddingBottom": 0,
    "paddingLeft": scalePx2dp(15)
  },
  "goods-list-header-back-icon": {
    "width": scalePx2dp(8.5),
    "height": scalePx2dp(17),
    "borderRadius": 0
  },
  "goods-list-select": {
    "paddingTop": 0,
    "paddingRight": scalePx2dp(15),
    "paddingBottom": 0,
    "paddingLeft": scalePx2dp(15)
  },
  "goods-list-sidebar": {
    "backgroundColor": "#F4F6FB",
    "height": "100%",
    "borderTopLeftRadius": scalePx2dp(12),
    "borderBottomLeftRadius": scalePx2dp(12)
  },
  "at-drawer__content": {
    "borderTopLeftRadius": scalePx2dp(12),
    "borderBottomLeftRadius": scalePx2dp(12)
  },
  "at-drawer__mask": {
    "backgroundColor": "rgba(51, 56, 64, 0.7)"
  }
})
