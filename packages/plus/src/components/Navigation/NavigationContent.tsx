import styled from '@emotion/styled'
import { Button, Stack, Tooltip } from '@ultraviolet/ui'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation } from './NavigationProvider'
import {
  ANIMATION_DURATION,
  NAVIGATION_COLLASPED_WIDTH,
  NAVIGATION_MAX_WIDTH,
  NAVIGATION_MIN_WIDTH,
} from './constants'
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

const StickyFooter = styled.div`
  display: flex;
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral.background};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  padding: ${({ theme }) => `${theme.space['1']} ${theme.space['2']}`};
  transition: justify-content ${ANIMATION_DURATION}ms ease-in-out;
  box-shadow: ${({ theme }) => theme.shadows.defaultShadow};
  transition: box-shadow 230ms ease-in-out;
  justify-content: flex-end;

  &[data-has-overflow-style="false"] {
    box-shadow: none;
    border: none;
  }
`

const Header = styled.div`
  background: ${({ theme }) => theme.colors.neutral.background};
`

const LogoContainer = styled(Stack)`
  margin: ${({ theme }) =>
    `${theme.space['3']} ${theme.space['3']} ${theme.space['2']} ${theme.space['3']}`};
  max-width: 220px;
  height: 22px;
  overflow: hidden;
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
    locales,
    navigationRef,
    allowNavigationResize,
    shouldAnimate,
  } = context

  const sliderRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const isScrollAtBottom = useCallback(() => {
    if (contentRef.current) {
      if (
        contentRef.current.scrollTop + contentRef.current.offsetHeight >=
        contentRef.current.scrollHeight
      ) {
        return false
      }
    }

    return true
  }, [])

  const [footerHasOverflowStyle, setFooterHasOverflowStyle] = useState(
    isScrollAtBottom(),
  )

  // This is for detecting if there is scroll on the content and set the shadow on the footer
  useEffect(() => {
    const scroll = () => {
      const hasOverflow = isScrollAtBottom()

      if (footerHasOverflowStyle !== hasOverflow) {
        setFooterHasOverflowStyle(hasOverflow)
      }
    }

    if (contentRef.current) {
      contentRef.current.addEventListener('scroll', scroll)
    }

    return () => {
      contentRef.current?.removeEventListener('scroll', scroll)
    }
  }, [footerHasOverflowStyle, isScrollAtBottom])

  // This will set the shadow on the footer when the component is mounted
  useEffect(() => {
    setFooterHasOverflowStyle(isScrollAtBottom())
  }, [isScrollAtBottom])

  // It will handle the resize of the navigation when the user drag the vertical bar
  useEffect(() => {
    let prevX: number
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

    sliderRef.current?.addEventListener('mousedown', mousedown)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sliderRef.current?.removeEventListener('mousedown', mousedown)
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
    <StyledNav className={className} id={id}>
      <Container
        ref={navigationRef}
        data-animation={shouldAnimate ? animation : undefined}
        data-expanded={expanded}
        width={width}
      >
        {logo ? (
          <Header>
            <LogoContainer
              justifyContent={!expanded ? 'center' : undefined}
              alignItems="start"
            >
              {typeof logo === 'function'
                ? logo(animation ? false : expanded)
                : logo}
            </LogoContainer>
          </Header>
        ) : null}
        <ContentContainer>
          <Content
            ref={contentRef}
            gap={0.25}
            data-is-expanded={expanded}
            data-animation={shouldAnimate ? animation : undefined}
          >
            {children}
          </Content>
          {allowNavigationResize ? (
            <StickyFooter data-has-overflow-style={footerHasOverflowStyle}>
              <Tooltip
                text={
                  expanded
                    ? locales['navigation.collapse.button']
                    : locales['navigation.expand.button']
                }
                placement="right"
              >
                <Button
                  variant="ghost"
                  sentiment="neutral"
                  size="small"
                  icon={expanded ? 'arrow-left-double' : 'arrow-right-double'}
                  aria-label={
                    expanded
                      ? locales['navigation.collapse.button']
                      : locales['navigation.expand.button']
                  }
                  onClick={() => {
                    toggleExpand()
                    onToggleExpand?.(!expanded)
                  }}
                />
              </Tooltip>
            </StickyFooter>
          ) : null}
        </ContentContainer>
      </Container>
      {allowNavigationResize ? (
        <Slider data-testid="slider" ref={sliderRef} />
      ) : null}
    </StyledNav>
  )
}
