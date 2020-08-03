
import { StyleSheet, Dimensions } from 'react-native'

// 一般app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 375

function scalePx2dp (uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}

export default StyleSheet.create({
  "list": {
    "flexDirection": "column",
    "display": "flex",
    "width": "100%",
    "height": "100%",
    "backgroundColor": "#F8F8F8"
  },
  "list-item": {
    "backgroundColor": "#FFFFFF",
    "height": scalePx2dp(50),
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "borderWidth": scalePx2dp(0.5),
    "borderStyle": "solid",
    "borderColor": "#eeeeee",
    "borderTopWidth": 0,
    "borderLeftWidth": 0
  },
  "list-item-hover": {
    "backgroundColor": "#eeeeee",
    "height": scalePx2dp(50),
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "borderWidth": scalePx2dp(0.5),
    "borderStyle": "solid",
    "borderColor": "#eeeeee",
    "borderTopWidth": 0,
    "borderLeftWidth": 0
  },
  "item-title": {
    "fontSize": scalePx2dp(15),
    "color": "#666666",
    "marginLeft": scalePx2dp(15)
  },
  "item-title-select": {
    "fontSize": scalePx2dp(15),
    "color": "#F23030",
    "marginLeft": scalePx2dp(15)
  },
  "at-drawer__content": {
    "borderTopLeftRadius": scalePx2dp(12),
    "borderBottomLeftRadius": scalePx2dp(12)
  },
  "at-drawer__mask": {
    "backgroundColor": "rgba(51, 56, 64, 0.7)"
  }
})
