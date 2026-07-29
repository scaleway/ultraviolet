import type { ReactNode } from 'react'
import { isStringNumberArray } from './isStringNumberArray'

const recursivelyGetChildrenString = (children: ReactNode): string => {
  if (typeof children === 'string') {
    return children
  }

  if (isStringNumberArray(children)) {
    return children.join(' ')
  }

  if (Array.isArray(children)) {
    let finalString = ''
    for (const child of children) {
      finalString = finalString.concat(' ', recursivelyGetChildrenString(child))
    } // Recursively add every string or number of the array

    return finalString
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
