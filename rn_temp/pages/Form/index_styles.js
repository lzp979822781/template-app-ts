
import { StyleSheet, Dimensions } from 'react-native'

// 一般app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 375

function scalePx2dp (uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}

export default StyleSheet.create({
  "scrollview": {
    "height": scalePx2dp(600)
  },
  "form": {
    "flexDirection": "column",
    "display": "flex",
    "width": "100%",
    "height": "100%",
    "backgroundColor": "#F8F8F8"
  },
  "line": {
    "height": 0,
    "borderBottomWidth": scalePx2dp(0.5),
    "borderColor": "#eeeeee"
  },
  "input": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "paddingLeft": scalePx2dp(15),
    "paddingTop": scalePx2dp(10),
    "paddingBottom": scalePx2dp(10)
  },
  "textarea-view": {
    "paddingTop": scalePx2dp(10),
    "paddingLeft": scalePx2dp(15),
    "borderBottomWidth": scalePx2dp(0.5),
    "borderColor": "#eeeeee"
  },
  "textarea": {
    "marginTop": scalePx2dp(10),
    "marginRight": scalePx2dp(10),
    "marginBottom": scalePx2dp(10),
    "borderWidth": scalePx2dp(0.5),
    "height": scalePx2dp(50),
    "borderColor": "#eeeeee",
    "paddingTop": scalePx2dp(10),
    "paddingRight": scalePx2dp(10),
    "paddingBottom": scalePx2dp(10),
    "paddingLeft": scalePx2dp(10)
  },
  "input-title": {
    "color": "#666666",
    "fontSize": scalePx2dp(14)
  },
  "btn": {
    "width": "100%",
    "height": scalePx2dp(40),
    "backgroundColor": "transparent",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "at-drawer__content": {
    "borderTopLeftRadius": scalePx2dp(12),
    "borderBottomLeftRadius": scalePx2dp(12)
  },
  "at-drawer__mask": {
    "backgroundColor": "rgba(51, 56, 64, 0.7)"
  }
})
