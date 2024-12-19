import { Children, type ReactNode, isValidElement } from 'react'

/**
 * Search inside a children (React Element) recursively until a result is found
 */
export const searchChildren = (
  children: ReactNode,
  searchString: string,
): ReactNode[] => {
  const matches: ReactNode[] = []
  const searchRegex = new RegExp(searchString, 'i')

  Children.forEach(children, child => {
    if (typeof child === 'string' && child.match(searchRegex)) {
      matches.push(child)
    } else if (isValidElement(child)) {
      const childProps = child.props as { children: ReactNode }

      // Recursively search the children of this element
      const childMatches = searchChildren(childProps.children, searchString)

      if (childMatches.length > 0) {
        // If any matches are found within this child's children, push the entire child element
        matches.push(child)
      }
    }
  })

  return matches
}
