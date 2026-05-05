'use client'

import { cn } from '@ultraviolet/utils'
import { assignInlineVars, setElementVars } from '@vanilla-extract/dynamic'
import { useEffect, useRef } from 'react'

import { Stack } from '../../components/Stack'

import {
  ANIMATION_DURATION,
  NAVIGATION_COLLASPED_WIDTH,
  NAVIGATION_MAX_WIDTH,
  NAVIGATION_MIN_WIDTH,
} from './constants'
import { Footer } from './Footer'
import { Header } from './Header'
import { useNavigation } from './NavigationProvider'
import { navigationStyle } from './styles.css'
import {
  widthNavigationContainer,
  widthNavigationContainerDuration,
  widthNavigationContainerExpanded,
} from './variables.css'

import type { NavigationProps } from './types'

function clamp(min: number, value: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export const NavigationContent = ({
  children,
  logo,
  onWidthResize,
  className,
  'data-testid': dataTestId,
  id,
  onToggleExpand,
}: NavigationProps) => {
  const context = useNavigation()

  if (!context) {
    throw new Error(
      'Navigation should be inside NavigationProvider to use it properly.',
    )
  }

  const {
    setWidth,
    width,
    expanded,
    toggleExpand,
    animation,
    navigationRef,
    allowNavigationResize,
    shouldAnimate,
  } = context

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  // It will handle the resize of the navigation when the user drag the vertical bar
  useEffect(() => {
    let prevX: number | undefined
    let navRect: DOMRect | undefined
    let shouldCollapseOnMouseUp = false
    let shouldExpandOnMouseUp = false

    const mouseMove = (event: MouseEvent) => {
      if (prevX !== undefined) {
        const navWidth = navRect?.width ?? 0
        const newWidth = clamp(
          NAVIGATION_MIN_WIDTH,
          navWidth + (event.clientX - prevX),
          NAVIGATION_MAX_WIDTH,
        )

        if (navigationRef.current && expanded) {
          navigationRef.current.style.width = `${newWidth}px`
          setElementVars(navigationRef.current, {
            [widthNavigationContainerExpanded]: `${newWidth}px`,
          })
        }

        if (newWidth <= NAVIGATION_MIN_WIDTH) {
          shouldCollapseOnMouseUp = true
        } else {
          shouldCollapseOnMouseUp = false
        }

        if (newWidth >= NAVIGATION_COLLASPED_WIDTH && !expanded) {
          shouldExpandOnMouseUp = true
        } else {
          shouldExpandOnMouseUp = false
        }
      }
    }

    const mousedown = (event: MouseEvent) => {
      prevX = event.clientX
      navRect = navigationRef.current?.getBoundingClientRect()

      if (navigationRef.current) {
        setElementVars(navigationRef.current, {
          [widthNavigationContainerDuration]: '0',
        })
      }

      const mouseup = () => {
        if (shouldCollapseOnMouseUp || shouldExpandOnMouseUp) {
          toggleExpand()
          onToggleExpand?.(!expanded)
          if (navigationRef.current) {
            setElementVars(navigationRef.current, {
              [widthNavigationContainerExpanded]: `${width}px`,
            })
          }
        }

        if (navigationRef.current) {
          if (!(shouldCollapseOnMouseUp || shouldExpandOnMouseUp)) {
            onWidthResize?.(navigationRef.current.offsetWidth)
            setWidth?.(navigationRef.current.offsetWidth)
          }

          if (!expanded) {
            navigationRef.current.style.width = ''
          }

          setElementVars(navigationRef.current, {
            [widthNavigationContainerDuration]: `${shouldAnimate ? ANIMATION_DURATION : 0}ms`,
          })
        }

        document.removeEventListener('mousemove', mouseMove)
        window.removeEventListener('mouseup', mouseup)
      }

      document.addEventListener('mousemove', mouseMove)
      window.addEventListener('mouseup', mouseup)
    }
    const sliderRefCurrent = sliderRef.current

    sliderRefCurrent?.addEventListener('mousedown', mousedown)

    return () => {
      sliderRefCurrent?.removeEventListener('mousedown', mousedown)
    }
  }, [
    expanded,
    navigationRef,
    onToggleExpand,
    onWidthResize,
    setWidth,
    toggleExpand,
    shouldAnimate,
    width,
  ])

  let navWidth = width
  if (animation === 'collapse' || (!expanded && !animation)) {
    navWidth = NAVIGATION_COLLASPED_WIDTH
  }

  return (
    <nav
      className={cn(className, navigationStyle.navigation)}
      data-testid={dataTestId}
      id={id}
    >
      <div
        className={navigationStyle.container()}
        ref={navigationRef}
        style={assignInlineVars({
          [widthNavigationContainer]: `${navWidth}px`,
          [widthNavigationContainerExpanded]: `${width}px`,
          [widthNavigationContainerDuration]: `${shouldAnimate ? ANIMATION_DURATION : 0}ms`,
        })}
      >
        {logo ? <Header logo={logo} /> : null}
        <div className={cn(navigationStyle.contentContainer)}>
          <Stack
            className={navigationStyle.content}
            gap={0.25}
            ref={contentRef}
          >
            {children}
          </Stack>
          {allowNavigationResize ? (
            <Footer contentRef={contentRef} onToggleExpand={onToggleExpand} />
          ) : null}
        </div>
      </div>
      {allowNavigationResize ? (
        <div
          className={navigationStyle.slider}
          data-testid="slider"
          ref={sliderRef}
        />
      ) : null}
    </nav>
  )
}
