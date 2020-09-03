
global.jingying = {}
export function set (key, val) {
  global.jingying[key] = val
}

export function get (key) {
  return global.jingying[key]
}