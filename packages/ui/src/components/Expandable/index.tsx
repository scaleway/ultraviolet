import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

const ANIMATION_DURATION = 300 // in ms

type ExpandableProps = {
  /**
   * The content to display
   */
  children: ReactNode
  /**
   * To display or not the content
   */
  opened?: boolean
  /**
   * The minimum height of the content
   */
  minHeight?: number
  className?: string
}

export const StyledExpandable = styled('div', {
  shouldForwardProp: prop => !['opened'].includes(prop),
})<{ opened?: boolean }>`
  transition: max-height ${ANIMATION_DURATION}ms ease-out,
    opacity ${ANIMATION_DURATION}ms ease-out;
  overflow: hidden;
  height: auto;
  max-height: ${({ opened }) => (opened ? 'initial' : 0)};
`

export const Expandable = ({
  children,
  opened,
  minHeight = 0,
  className,
}: ExpandableProps) => {
  const [height, setHeight] = useState<number | null>(null)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | undefined>()
  const ref = useRef<HTMLDivElement>(null)

  /**
   * At mount, we set the height variable to the height of the content only if the component is closed.
   * This is to ensure we don't have animation when the component is opened at mount.
   */
  useEffect(
    () => {
      if (ref.current) {
        setHeight(ref.current.scrollHeight ?? 0)
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current?.scrollHeight],
  )

  /**
   * Here we set maxHeight to the height of the content when the component is opened
   * and after 300ms we set maxHeight to initial to let the content grow with animation.
   * Setting it to initial is required to be able to have nested expandable or the height won't follow.
   */
  useEffect(() => {
    if (opened && ref.current && height) {
      ref.current.style.maxHeight = `${height}px`
      transitionTimer.current = setTimeout(() => {
        if (ref.current) {
          ref.current.style.maxHeight = 'initial'
        }
      }, ANIMATION_DURATION)
    } else {
      clearTimeout(transitionTimer.current)

      if (ref.current && height) {
        ref.current.style.maxHeight = `${height}px`
        transitionTimer.current = setTimeout(() => {
          if (ref.current) {
            ref.current.style.maxHeight = '0'
          }
        }, 0)
      }
    }

    return () => {
      clearTimeout(transitionTimer.current)
    }
  }, [height, minHeight, opened])

  return (
    <StyledExpandable ref={ref} className={className} opened={opened}>
      {children}
    </StyledExpandable>
  )
}
