const recursivelyGetChildrenString = children => {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return '' // We can't determine which string to display in tooltip
  if (typeof children === 'object') {
    const childProps = children?.props?.children
    if (childProps) return recursivelyGetChildrenString(childProps)
  }

  return ''
}

export default recursivelyGetChildrenString
