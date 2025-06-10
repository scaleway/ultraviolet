import { Children, type ReactNode, cloneElement, isValidElement } from 'react'

/**
 * Search inside a children (React Element) recursively until a result is found
 */
export const searchChildren = (
  children: ReactNode,
  searchString: string,
): ReactNode[] => {
  const searchRegex = new RegExp(searchString, 'i')

  const matches = Children.map(children, child => {
    if (typeof child === 'string' && child.match(searchRegex)) {
      return child
    }

    if (isValidElement(child)) {
      const childProps = child.props as {
        children: ReactNode
        label?: string
        searchText?: string
      }

      if (childProps?.searchText?.match(searchRegex)) {
        return cloneElement(child, {
          children: childProps.children,
        } as { children: ReactNode })
      }

      // This is the case where there is a Menu.Group we want to search the Menu.Item only
      if (childProps?.label) {
        return cloneElement(child, {
          children: searchChildren(childProps.children, searchString),
        } as { children: ReactNode })
      }

      // Recursively search the children of this element
      const childMatches = searchChildren(childProps.children, searchString)

      if (childMatches.length > 0) {
        // If any matches are found within this child's children, return the entire child element
        return child
      }
    }

    return null
  })

  // Filter out null values and flatten the array
  return matches ? matches.filter(Boolean) : []
}
