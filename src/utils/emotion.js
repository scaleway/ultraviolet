import flatten from './flatten'

export function cx(styles) {
  return theme => {
    const p = { theme }

    function parseStyle(style) {
      if (typeof style === 'function') {
        return style(p)
      }

      return style
    }

    if (Array.isArray(styles)) {
      return flatten(styles).map(parseStyle)
    }

    return parseStyle(styles)
  }
}
