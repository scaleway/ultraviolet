'use client'

import { cn } from '@ultraviolet/themes'
import { Stack } from '@ultraviolet/ui'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useEffect, useRef } from 'react'
import { NAVIGATION_COLLASPED_WIDTH, NAVIGATION_MIN_WIDTH } from './constants'
import { Footer } from './Footer'
import { Header } from './Header'
import { useNavigation } from './NavigationProvider'
import {
  navigation,
  navigationContainer,
  navigationContent,
  navigationContentContainer,
  navigationContentContainerCollapsed,
  navigationSlider,
} from './styles.css'
import type { NavigationProps } from './types'
import { widthNavigationContainer } from './variables.css'

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
        const newWidth = navWidth + (event.clientX - prevX)

        if (navigationRef.current && expanded) {
          navigationRef.current.style.width = `${newWidth}px`
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
      document.body.style.pointerEvents = 'none'
      document.body.style.userSelect = 'none'

      prevX = event.clientX
      navRect = navigationRef.current?.getBoundingClientRect()

      const mouseup = () => {
        if (shouldCollapseOnMouseUp || shouldExpandOnMouseUp) {
          toggleExpand()
          onToggleExpand?.(!expanded)
        }

        if (navigationRef.current) {
          if (!shouldCollapseOnMouseUp && !shouldExpandOnMouseUp) {
            onWidthResize?.(navigationRef.current.offsetWidth)
            setWidth?.(navigationRef.current.offsetWidth)
          }

          if (!expanded) {
            navigationRef.current.style.width = ''
          }
        }

        document.removeEventListener('mousemove', mouseMove)
        window.removeEventListener('mouseup', mouseup)

        document.body.style.pointerEvents = ''
        document.body.style.userSelect = ''
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
  ])

  return (
    <nav className={cn(className, navigation)} data-testid={dataTestId} id={id}>
      <div
        className={navigationContainer({
          animation: shouldAnimate ? animation : undefined,
          expanded,
        })}
        ref={navigationRef}
        style={assignInlineVars({
          [widthNavigationContainer]: `${width}px`,
        })}
      >
        {logo ? <Header logo={logo} /> : null}
        <div
          className={cn(
            navigationContentContainer,
            expanded ? '' : navigationContentContainerCollapsed,
          )}
        >
          <Stack className={navigationContent} gap={0.25} ref={contentRef}>
            {children}
          </Stack>
          {allowNavigationResize ? (
            <Footer contentRef={contentRef} onToggleExpand={onToggleExpand} />
          ) : null}
        </div>
      </div>
      {allowNavigationResize ? (
        <div
          className={navigationSlider}
          data-testid="slider"
          ref={sliderRef}
        />
      ) : null}
    </nav>
  )
}
