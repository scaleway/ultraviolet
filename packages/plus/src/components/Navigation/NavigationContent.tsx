'use client'

import styled from '@emotion/styled'
import { Stack } from '@ultraviolet/ui'
import { useEffect, useRef } from 'react'
import {
  ANIMATION_DURATION,
  NAVIGATION_COLLASPED_WIDTH,
  NAVIGATION_MAX_WIDTH,
  NAVIGATION_MIN_WIDTH,
} from './constants'
import { Footer } from './Footer'
import { Header } from './Header'
import { useNavigation } from './NavigationProvider'
import type { NavigationProps } from './types'

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  position: relative;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
`

const Container = styled('div', {
  shouldForwardProp: prop => !['width'].includes(prop),
})<{
  width: number
}>`
  background: ${({ theme }) => theme.colors.neutral.background};
  display: flex;
  flex-direction: column;

  width: ${({ width }) => width}px;

  &[data-expanded="true"][data-animation="false"] {
    max-width: ${NAVIGATION_MAX_WIDTH}px;
    min-width: ${NAVIGATION_MIN_WIDTH}px;
  }

  &[data-expanded="false"] {
    width: ${NAVIGATION_COLLASPED_WIDTH}px;
  }

  &[data-animation="expand"] {
    transition: width ${ANIMATION_DURATION}ms ease-in-out;
    width: ${({ width }) => width}px;
  }

  &[data-animation="collapse"] {
    transition: width ${ANIMATION_DURATION}ms ease-in-out;
    width: ${NAVIGATION_COLLASPED_WIDTH}px;
  }
`

const ContentContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Content = styled(Stack)`
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;

  &[data-is-expanded="false"] {
    align-items: center;
    padding: ${({ theme }) => theme.space['2']};
  }

  &[data-is-expanded="true"],
  &[data-animation="expand"] {
    padding: ${({ theme }) => theme.space['2']};
  }
`

const Slider = styled.div`
  background: transparent;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 6px;
  cursor: col-resize;
  border-right: 2px solid transparent;
  display: flex;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.border};
  }
`

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
    <StyledNav className={className} data-testid={dataTestId} id={id}>
      <Container
        data-animation={shouldAnimate ? animation : undefined}
        data-expanded={expanded}
        ref={navigationRef}
        width={width}
      >
        {logo ? <Header logo={logo} /> : null}
        <ContentContainer>
          <Content
            data-animation={shouldAnimate ? animation : undefined}
            data-is-expanded={expanded}
            gap={0.25}
            ref={contentRef}
          >
            {children}
          </Content>
          {allowNavigationResize ? (
            <Footer contentRef={contentRef} onToggleExpand={onToggleExpand} />
          ) : null}
        </ContentContainer>
      </Container>
      {allowNavigationResize ? (
        <Slider data-testid="slider" ref={sliderRef} />
      ) : null}
    </StyledNav>
  )
}
