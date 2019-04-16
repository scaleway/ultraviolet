import { colors } from 'theming'

export function thColor(value) {
  return p => {
    const colorsValue = colors(p)
    const color = colorsValue[value]
    if (!color) return value
    return color(p)
  }
}
