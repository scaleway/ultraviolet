import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useEffect, useRef, useState } from 'react'

import { ANIMATION_DURATION } from './constant'
import { animationDurationVar, expandableStyle } from './styles.css'

import type { ExpandableProps } from './types'

export const AnimatedExpandable = ({
  children,
  opened,
  minHeight = 0,
  className,
  'data-testid': dataTestId,
  style,
  animationDuration = ANIMATION_DURATION,
}: ExpandableProps) => {
  const [height, setHeight] = useState<number | null>(null)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    null,
  )
  const ref = useRef<HTMLDivElement>(null)
  const shouldBeAnimated = animationDuration > 0

  // To avoid expanded animation on first render
  const isFirstRender = useRef(true)

  useEffect(() => {
    setTimeout(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false
      }
    }, 0)
  }, [])
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
    if (isFirstRender.current && !opened && ref.current) {
      ref.current.style.maxHeight = `${minHeight ?? 0}px`
      ref.current.style.overflow = 'hidden'
    } else if (opened && ref.current && height) {
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
    <div
      className={cn(className, expandableStyle.expandable)}
      data-is-animated={shouldBeAnimated && !isFirstRender.current}
      data-testid={dataTestId}
      ref={ref}
      style={{
        ...assignInlineVars({
          [animationDurationVar]: `${animationDuration}ms`,
        }),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
