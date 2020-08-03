
import { StyleSheet, Dimensions } from 'react-native'

// 一般app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 375

function scalePx2dp (uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}

export default StyleSheet.create({
  "vStyleA": {
    "height": scalePx2dp(75),
    "backgroundColor": "#1aad19"
  },
  "test-actionsheet": {
    "marginTop": scalePx2dp(5)
  },
  "vStyleB": {
    "height": scalePx2dp(75),
    "backgroundColor": "#2782d7"
  },
  "vStyleC": {
    "height": scalePx2dp(75),
    "backgroundColor": "#f1f1f1"
  },
  "scrollview": {
    "height": scalePx2dp(600),
    "marginTop": scalePx2dp(10)
  },
  "test-footer": {
    "display": "flex",
    "flexDirection": "row"
  },
  "test-com-btn": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "test-modal": {
    "display": "flex"
  },
  "flex-row": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "test-upload-container": {
    "paddingTop": scalePx2dp(10),
    "paddingRight": scalePx2dp(10),
    "paddingBottom": scalePx2dp(10),
    "paddingLeft": scalePx2dp(10)
  },
  "test-upload-img": {
    "width": scalePx2dp(75),
    "height": scalePx2dp(75)
  },
  "test-drawer": {
    "minHeight": scalePx2dp(1000),
    "backgroundColor": "#fff",
    "borderRadius": scalePx2dp(12)
  },
  "page-section-1": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "flexWrap": "wrap"
  },
  "page-section-2": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "flexWrap": "wrap"
  },
  "swipper-container": {
    "height": scalePx2dp(150)
  },
  "swipper-item": {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "height": scalePx2dp(150)
  },
  "check-item-text": {
    "minWidth": scalePx2dp(30)
  },
  "badge-cls": {
    "marginTop": scalePx2dp(5)
  },
  "custom-badge": {
    "width": scalePx2dp(30),
    "height": scalePx2dp(30)
  },
  "at-drawer__content": {
    "borderTopLeftRadius": scalePx2dp(12),
    "borderBottomLeftRadius": scalePx2dp(12)
  },
  "at-drawer__mask": {
    "backgroundColor": "rgba(51, 56, 64, 0.7)"
  }
})
