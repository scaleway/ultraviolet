import type { ReactNode, RefObject } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Loader } from '../Loader'
import { Stack } from '../Stack'

type InfiniteScrollProps = {
  children: ReactNode
  className?: string
  'data-testid'?: string
  loadMore: () => void
  /**
   * Set this parameter if you want a different scroll listener if it's not the immediate parent of InfiniteScroll.
   */
  scrollParentRef?: RefObject<HTMLDivElement>
  isLoading?: boolean
  /**
   * The height of the spacer element at the bottom of the stack.
   */
  spacerHeight?: number
  loader?: ReactNode
}

/**
 * InfiniteScroll is a component that allows you to create a scrollable area with hidden pagination.
 * The component will take the first parent as the scroll listener. If you need to change the scroll listener, you can use the `scrollParentRef` prop.
 */
export const InfiniteScroll = ({
  children,
  className,
  'data-testid': dataTestId,
  loadMore,
  scrollParentRef,
  isLoading,
  spacerHeight = 50,
  loader,
}: InfiniteScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const debounce = useCallback((func: () => void, delay: number) => {
    let timeoutId: NodeJS.Timeout

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        func()
      }, delay)
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const scrollableContainer =
      scrollParentRef?.current || containerRef.current.parentElement
    if (!scrollableContainer) return

    const { scrollTop, scrollHeight, clientHeight } = scrollableContainer

    if (scrollTop + clientHeight >= scrollHeight - 1) {
      loadMore()
    }
  }, [loadMore, scrollParentRef])

  useEffect(() => {
    const scrollableContainer =
      scrollParentRef?.current || containerRef.current?.parentElement
    if (!scrollableContainer) return

    const debouncedHandleScroll = debounce(handleScroll, 500)
    scrollableContainer.addEventListener('scroll', debouncedHandleScroll)
  }, [debounce, handleScroll, scrollParentRef])

  const localLoader = useMemo(() => loader || <Loader active />, [loader])

  return (
    <Stack
      ref={containerRef}
      direction="column"
      justifyContent="center"
      className={className}
      data-testid={dataTestId}
      style={{ marginBottom: isLoading ? 0 : spacerHeight }}
      gap={1}
    >
      <div>{children}</div>
      {isLoading ? localLoader : null}
    </Stack>
  )
}
