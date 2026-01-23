import type { HTMLAttributes, ReactElement, ReactNode, Ref } from 'react'
import { cloneElement, isValidElement } from 'react'

type Props = Record<string, unknown>

/**
 * Merges two props objects with special handling for:
 * - className: concatenated
 * - style: shallow merged (child overrides)
 * - other props: child overrides parent
 *
 * Note: Event handlers are NOT merged to maintain server component compatibility.
 * Child event handlers take precedence over parent handlers.
 */
export const mergeProps = (parentProps: Props, childProps: Props): Props => {
  const merged: Props = { ...parentProps, ...childProps }

  for (const key of Object.keys(parentProps)) {
    const parentValue = parentProps[key]
    const childValue = childProps[key]

    // Merge className
    if (
      key === 'className' &&
      typeof parentValue === 'string' &&
      typeof childValue === 'string'
    ) {
      merged[key] = `${parentValue} ${childValue}`
    }
    // Merge style
    else if (key === 'style' && parentValue && childValue) {
      merged[key] = { ...(parentValue as object), ...(childValue as object) }
    }
  }

  return merged
}

/**
 * Render prop type that accepts either:
 * - A React element: `render={<NextLink href="/about" />}`
 * - A function receiving props: `render={(props) => <NextLink {...props} href="/about" />}`
 */
export type RenderProp<P = HTMLAttributes<HTMLElement>> =
  | ReactElement
  | ((props: P) => ReactElement)

/**
 * Renders a custom element with merged props.
 * Handles both element form (auto-merge) and function form (manual control).
 */
export const renderElement = <P extends Props>(
  render: RenderProp<P>,
  props: P & { ref?: Ref<HTMLElement>; children?: ReactNode },
): ReactElement | null => {
  const { ref: forwardedRef, children, ...restProps } = props

  // Function form: pass props to render function
  if (typeof render === 'function') {
    return render(props as P)
  }

  // Element form: clone element with merged props
  if (isValidElement(render)) {
    const elementProps = render.props as Props

    const mergedProps = {
      ...mergeProps(restProps, elementProps),
      ref: forwardedRef,
      children: children ?? elementProps['children'],
    }

    return cloneElement(render, mergedProps)
  }

  return null
}
