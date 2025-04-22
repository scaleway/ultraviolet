'use client'

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
  'data-testid'?: string
  /**
   * The duration of the animation in ms. If set to 0, the animation will be disabled.
   */
  animationDuration?: number
}

export const StyledExpandable = styled('div', {
  shouldForwardProp: prop => !['animationDuration'].includes(prop),
})<{ animationDuration: number }>`
  &[data-is-animated="true"] {
    transition:
      max-height ${({ animationDuration }) => animationDuration}ms ease-out,
      opacity ${({ animationDuration }) => animationDuration}ms ease-out;
    }
  height: auto;
`

const NoAnimationExpandable = ({
  children,
  opened,
  minHeight,
  className,
  'data-testid': dataTestId,
}: ExpandableProps) => (
  <div
    style={{ minHeight, display: !opened ? 'none' : undefined }}
    data-testid={dataTestId}
    className={className}
  >
    {children}
  </div>
)

export const AnimatedExpandable = ({
  children,
  opened,
  minHeight = 0,
  className,
  'data-testid': dataTestId,
  animationDuration = ANIMATION_DURATION,
}: ExpandableProps) => {
  const [height, setHeight] = useState<number | null>(null)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    null,
  )
  const ref = useRef<HTMLDivElement>(null)
  const shouldBeAnimated = animationDuration > 0

  /**
   * At mount, we set the height variable to the height of the content only if the component is closed.
   * This is to ensure we don't have animation when the component is opened at mount.
   */
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight ?? 0)
    }
  }, [ref.current?.scrollHeight])

  /**
   * Here we set maxHeight to the height of the content when the component is opened
   * and after 300ms we set maxHeight to initial to let the content grow with animation.
   * Setting it to initial is required to be able to have nested expandable or the height won't follow.
   */
  useEffect(() => {
    if (opened && ref.current && height) {
      ref.current.style.maxHeight = `${height}px`
      ref.current.style.visibility = ''
      transitionTimer.current = setTimeout(() => {
        if (ref.current) {
          ref.current.style.maxHeight = 'initial'
          ref.current.style.overflow = 'visible'
          ref.current.style.visibility = ''
        }
      }, ANIMATION_DURATION)
    } else {
      if (transitionTimer?.current) {
        clearTimeout(transitionTimer.current)
      }

      if (ref.current && height) {
        ref.current.style.maxHeight = `${height}px`
        transitionTimer.current = setTimeout(() => {
          if (ref.current) {
            ref.current.style.maxHeight = `${minHeight}px`
            ref.current.style.overflow = 'hidden'
            setTimeout(() => {
              if (ref.current && !minHeight) {
                ref.current.style.visibility = 'hidden'
              }
            }, ANIMATION_DURATION)
          }
        }, 0)
      }
    }

    return () => {
      if (transitionTimer?.current) {
        clearTimeout(transitionTimer.current)
      }
    }
  }, [animationDuration, height, minHeight, opened, shouldBeAnimated])

  return (
    <StyledExpandable
      data-testid={dataTestId}
      ref={ref}
      className={className}
      animationDuration={animationDuration}
      data-is-animated={shouldBeAnimated}
    >
      {children}
    </StyledExpandable>
  )
}

/**
 * The Expandable component is a dynamic React component that allows for the expansion of its children content
 * based on its height. The component comes with a sleek and smooth animation, providing a visually pleasing
 * user experience.
 */
export const Expandable = ({
  children,
  opened,
  minHeight,
  className,
  'data-testid': dataTestId,
  animationDuration = ANIMATION_DURATION,
}: ExpandableProps) => {
  if (animationDuration > 0) {
    return (
      <AnimatedExpandable
        opened={opened}
        minHeight={minHeight}
        className={className}
        data-testid={dataTestId}
        animationDuration={animationDuration}
      >
        {children}
      </AnimatedExpandable>
    )
  }

  return (
    <NoAnimationExpandable
      data-testid={dataTestId}
      className={className}
      minHeight={minHeight}
      opened={opened}
    >
      {children}
    </NoAnimationExpandable>
  )
}
