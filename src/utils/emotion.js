export function cx(styles) {
  return theme => {
    const p = { theme }
    return styles.map(style => {
      if (typeof style === 'function') {
        return style(p)
      }

      return style
    })
  }
}
