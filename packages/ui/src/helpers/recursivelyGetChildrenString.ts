import type { ReactNode } from 'react'
import { isStringOrNumberArray } from './isStringOrNumberArray'

const recursivelyGetChildrenString = (children: ReactNode): string => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children)
  }

  if (isStringOrNumberArray(children)) {
    return children.join(' ')
  }

  if (Array.isArray(children)) {
    return children
      .map(child => recursivelyGetChildrenString(child))
      .filter(Boolean)
      .join(' ')
  }

  if (typeof children === 'object') {
    const childProps = ((children as unknown as Record<string, unknown>)?.['props'] as Record<string, unknown>)?.[
      'children'
    ] as ReactNode
    if (childProps) {
      return recursivelyGetChildrenString(childProps)
    }
  }

  return ''
}

export default recursivelyGetChildrenString
