'use client'

import type { CSSProperties, ElementType, ReactNode, RefObject } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Loader } from '../Loader'

// This is the distance from the bottom of the scrollable container where the `onLoadMore` function will be called.
// Change this value if you want increase or decrease the distance from scroll bottom.
const HEIGHT_THRESHOLD = 100

type InfiniteScrollProps = {
  className?: string
  'data-testid'?: string
  /**
   * Function to be called when the user scrolls to the bottom of the stack. If not set the component will passby the children and nothing else.
   */
  onLoadMore: () => void | Promise<void>
  /**
   * Set this parameter if you want a different scroll listener if the scroll parent is wrongly detected.
   */
  scrollParentRef?: RefObject<HTMLDivElement> | RefObject<null>
  /**
   * The height of the InfiniteScroll component. This can be used to leave space between items and the InfiniteScroll component.
   */
  height?: number | string
  /**
   * Use this prop to replace the default loader with a custom one.
   */
  loader?: ReactNode
  id?: string
  /**
   * The element type to render as the container for the InfiniteScroll component.
   */
  as?: ElementType
  hasMore?: boolean
  /**
   * The distance from the bottom of the scrollable container where the `onLoadMore` function will be called.
   */
  heightThreshold?: number
  style?: CSSProperties
}

/**
 * InfiniteScroll is a component that allows you to create a scrollable area with hidden pagination.
 * You can add it at the end of a list of items and it will call the `onLoadMore` function when the user scrolls to the bottom of the list.
 * The component will take the first parent that has as the scroll to listen on it. In some rare cases, if you need to change the scroll listener, you can use the `scrollParentRef` prop.
 */
export const InfiniteScroll = ({
  className,
  'data-testid': dataTestId,
  onLoadMore,
  scrollParentRef,
  height = '2.5rem',
  loader,
  id,
  as: Component = 'div',
  hasMore = true,
  heightThreshold = HEIGHT_THRESHOLD,
  style,
}: InfiniteScrollProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const debounce = useCallback((func: () => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        func()
      }, delay)
    }
  }, [])

  const handleScroll = useCallback(
    (scrollableContainer: HTMLElement) => {
      if (!containerRef.current) {
        return
      }
      if (!onLoadMore) {
        return
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollableContainer

      if (scrollTop + clientHeight >= scrollHeight - heightThreshold) {
        setIsLoading(true)
        const result = onLoadMore()
        if (result instanceof Promise) {
          result
            .then(() => {
              setIsLoading(false)
            })
            .catch((error: unknown) => {
              setIsLoading(false)
              throw error
            })
        }
      }
    },
    [onLoadMore, heightThreshold],
  )

  useEffect(() => {
    if (!hasMore) {
      return
    }
    let scrollableContainer =
      scrollParentRef?.current ?? containerRef.current?.parentElement
    while (scrollableContainer && scrollableContainer !== document.body) {
      const { overflowY } = window.getComputedStyle(scrollableContainer)
      if (overflowY === 'auto' || overflowY === 'scroll') {
        break
      }
      scrollableContainer = scrollableContainer.parentElement
    }

    if (!scrollableContainer) {
      return
    }

    const debouncedHandleScroll = debounce(
      () => handleScroll(scrollableContainer),
      100,
    )
    scrollableContainer.addEventListener('scroll', debouncedHandleScroll)

    // We need to return to remove the event listener when the component is unmounted
    // As we return void above eslint is not happy
    // eslint-disable-next-line consistent-return
    return () => {
      scrollableContainer.removeEventListener('scroll', debouncedHandleScroll)
    }
  }, [debounce, handleScroll, hasMore, onLoadMore, scrollParentRef])

  const localLoader = useMemo(() => loader ?? <Loader active />, [loader])

  if (isLoading) {
    return localLoader
  }

  return (
    <Component
      className={className}
      data-testid={dataTestId}
      id={id}
      ref={containerRef}
      role="feed"
      style={{ height, ...style }}
    />
  )
}
