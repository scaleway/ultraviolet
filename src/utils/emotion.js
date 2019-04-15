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
      return styles.map(parseStyle)
    }

    return parseStyle(styles)
  }
}
