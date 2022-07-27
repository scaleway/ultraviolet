import { ReactNode, isValidElement } from 'react'

const recursivelyGetChildrenString = (children: ReactNode): string => {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return '' // We can't determine which string to display in tooltip
  if (typeof children === 'object' && isValidElement(children)) {
    const childProps = (children?.props as Record<string, unknown>)
      ?.children as ReactNode
    if (childProps) return recursivelyGetChildrenString(childProps)
  }

  return ''
}

export default recursivelyGetChildrenString
