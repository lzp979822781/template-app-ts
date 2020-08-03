
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
  "item-dec-1-icon": {
    "display": "flex",
    "width": scalePx2dp(15),
    "height": scalePx2dp(15),
    "borderWidth": scalePx2dp(0.5),
    "borderStyle": "solid",
    "borderColor": "#4381E5",
    "backgroundColor": "#D9E6FA",
    "alignItems": "center",
    "justifyContent": "center",
    "marginRight": scalePx2dp(5),
    "borderTopLeftRadius": scalePx2dp(3),
    "borderTopRightRadius": 0,
    "borderBottomRightRadius": scalePx2dp(3),
    "borderBottomLeftRadius": 0
  },
  "list-item-box": {
    "marginBottom": scalePx2dp(15),
    "marginLeft": scalePx2dp(15),
    "marginRight": scalePx2dp(15),
    "borderRadius": scalePx2dp(2),
    "overflow": "hidden"
  },
  "top-gap": {
    "marginTop": scalePx2dp(15)
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
    "width": scalePx2dp(75),
    "height": scalePx2dp(75),
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor": "#f5f5f5",
    "borderRadius": scalePx2dp(6),
    "marginRight": scalePx2dp(10)
  },
  "content-box": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "item-image": {
    "width": scalePx2dp(60),
    "height": scalePx2dp(50)
  },
  "item-title": {
    "fontSize": scalePx2dp(18),
    "color": "#333840",
    "fontWeight": "700",
    "marginBottom": scalePx2dp(5)
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
  "swipe-action": {
    "display": "flex",
    "height": scalePx2dp(100),
    "backgroundColor": "#eeeeee"
  },
  "item-dec-1-icon-text": {
    "fontSize": scalePx2dp(10),
    "color": "#4381E5"
  },
  "item-dec-2": {
    "fontSize": scalePx2dp(12),
    "color": "#888888"
  },
  "item-dec-3": {
    "fontSize": scalePx2dp(12),
    "color": "#F2270C",
    "fontWeight": "700"
  },
  "item-dec-3-1": {
    "fontSize": scalePx2dp(14),
    "color": "#F2270C",
    "marginRight": scalePx2dp(5),
    "fontWeight": "700"
  },
  "item-dec-4": {
    "marginRight": scalePx2dp(5),
    "fontSize": scalePx2dp(10),
    "color": "#333840"
  },
  "item-dec-5": {
    "fontSize": scalePx2dp(12),
    "color": "#989CA5"
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
    "height": scalePx2dp(1),
    "backgroundColor": "#EEEEEE",
    "marginTop": scalePx2dp(10),
    "marginBottom": scalePx2dp(10)
  },
  "btn-1": {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "width": scalePx2dp(74),
    "height": scalePx2dp(22),
    "borderWidth": scalePx2dp(0.5),
    "borderStyle": "solid",
    "borderColor": "#8c8c8c",
    "borderRadius": scalePx2dp(21),
    "marginRight": scalePx2dp(5)
  },
  "btn-1-text": {
    "fontSize": scalePx2dp(10),
    "color": "#262626"
  },
  "btn-2": {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "width": scalePx2dp(60),
    "height": scalePx2dp(22),
    "backgroundColor": "#f2140c",
    "borderRadius": scalePx2dp(21)
  },
  "btn-2-text": {
    "fontSize": scalePx2dp(10),
    "color": "#FFFFFF"
  },
  "at-drawer__content": {
    "borderTopLeftRadius": scalePx2dp(12),
    "borderBottomLeftRadius": scalePx2dp(12)
  },
  "at-drawer__mask": {
    "backgroundColor": "rgba(51, 56, 64, 0.7)"
  }
})
