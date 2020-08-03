
import { StyleSheet, Dimensions } from 'react-native'

// 一般app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 375

function scalePx2dp (uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}

export default StyleSheet.create({
  "item-title": {
    "fontSize": scalePx2dp(16),
    "color": "#333840",
    "fontWeight": "700",
    "marginBottom": scalePx2dp(5)
  },
  "list-item-box": {
    "borderRadius": scalePx2dp(2),
    "overflow": "hidden"
  },
  "list-item": {
    "backgroundColor": "#FFFFFF",
    "paddingTop": scalePx2dp(15),
    "paddingRight": scalePx2dp(15),
    "paddingBottom": scalePx2dp(15),
    "paddingLeft": scalePx2dp(15),
    "display": "flex",
    "flexDirection": "row"
  },
  "list-image-box": {
    "display": "flex",
    "width": scalePx2dp(100),
    "height": scalePx2dp(40),
    "justifyContent": "center",
    "alignItems": "center",
    "borderColor": "#f5f5f5",
    "borderWidth": scalePx2dp(1),
    "marginRight": scalePx2dp(10)
  },
  "content-box": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "item-image": {
    "width": scalePx2dp(90),
    "height": scalePx2dp(30)
  },
  "list": {
    "flexDirection": "column",
    "display": "flex",
    "width": "100%",
    "height": "100%",
    "backgroundColor": "#F8F8F8"
  },
  "item-dec": {
    "display": "flex",
    "flexDirection": "row",
    "marginBottom": scalePx2dp(5),
    "alignItems": "center"
  },
  "item-dec-bottom": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "item-dec-bottom-left": {
    "width": "50%",
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "item-dec-bottom-rignt": {
    "width": "50%",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-end"
  },
  "item-dec-1": {
    "fontSize": scalePx2dp(13),
    "color": "#989CA5"
  },
  "item-dec-2": {
    "fontSize": scalePx2dp(12),
    "color": "#888888"
  },
  "item-dec-3": {
    "marginLeft": scalePx2dp(2.5),
    "marginRight": scalePx2dp(2.5),
    "fontSize": scalePx2dp(12),
    "color": "#F2270C",
    "fontWeight": "300"
  },
  "item-dec-vertical-division": {
    "width": scalePx2dp(1),
    "height": scalePx2dp(8),
    "backgroundColor": "#E3E8EE",
    "marginTop": scalePx2dp(4),
    "marginLeft": scalePx2dp(5),
    "marginRight": scalePx2dp(5)
  },
  "item-dec-division": {
    "width": "100%",
    "height": scalePx2dp(0.5),
    "backgroundColor": "#EEEEEE"
  },
  "at-drawer__content": {
    "borderTopLeftRadius": scalePx2dp(12),
    "borderBottomLeftRadius": scalePx2dp(12)
  },
  "at-drawer__mask": {
    "backgroundColor": "rgba(51, 56, 64, 0.7)"
  }
})
