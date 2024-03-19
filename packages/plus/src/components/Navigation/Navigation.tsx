import styled from '@emotion/styled'
import { Button, Stack } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { Group } from './Group'
import { Item } from './Item'
import { NavigationProvider, useNavigation } from './NavigationProvider'
import { PinnedItems } from './PinnedItems'
import {
  ANIMATION_DURATION,
  NAVIGATION_COLLASPED_WIDTH,
  NAVIGATION_MIN_WIDTH,
  NAVIGATION_WIDTH,
} from './constants'
import NavigationLocales from './locales/en'

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  position: relative;
`

const Container = styled.div`
  background: ${({ theme }) => theme.colors.neutral.background};
  display: flex;
  flex-direction: column;

  width: ${NAVIGATION_WIDTH}px;

  &[data-expanded='true'][data-animation='false'] {
    max-width: 320px;
    min-width: ${NAVIGATION_MIN_WIDTH}px;
  }

  &[data-expanded='false'] {
    width: ${NAVIGATION_COLLASPED_WIDTH}px;
  }

  &[data-animation='expand'] {
    transition: width ${ANIMATION_DURATION}ms ease-in-out;
    width: ${NAVIGATION_WIDTH}px;
  }

  &[data-animation='collapse'] {
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

  justify-content: flex-end;
`

const Header = styled.div`
  background: ${({ theme }) => theme.colors.neutral.background};
`

const LogoContainer = styled(Stack)`
  margin: ${({ theme }) =>
    `${theme.space['3']} ${theme.space['3']} ${theme.space['2']} ${theme.space['3']}`};
  max-width: 220px;
  height: 22px;
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

  &[data-is-expanded='false'] {
    padding: ${({ theme }) => theme.space['2']} 0;
  }

  &[data-is-expanded='true'],
  &[data-animation='expand'] {
    padding: ${({ theme }) => theme.space['2']};
  }
`

const Slider = styled.div`
  background: transparent;
  cursor: col-resize;
  border: 2px solid transparent;
  margin-right: -2px; // To make the slider look like it's part of the navigation
  display: flex;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.primary.border};
  }
`

type NavigationContentProps = {
  children: ReactNode
  logo?: ReactNode | ((expanded: boolean) => ReactNode)
  className?: string
  onClickExpand?: () => void
}

const NavigationContent = ({
  children,
  logo,
  onClickExpand,
  className,
}: NavigationContentProps) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const navigationRef = useRef<HTMLDivElement>(null)

  const { expanded, setExpanded, animation, setAnimation } = useNavigation()

  // This function will be triggered when expand/collapse button is clicked
  const triggerExpand = useCallback(() => {
    onClickExpand?.()
    if (navigationRef.current) {
      navigationRef.current.style.width = ''
    }

    setAnimation(expanded ? 'collapse' : 'expand')

    setTimeout(() => {
      setExpanded()
      setAnimation(false)
    }, ANIMATION_DURATION)
  }, [expanded, onClickExpand, setAnimation, setExpanded])

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
          triggerExpand()
        }

        if (navigationRef.current && !expanded) {
          navigationRef.current.style.width = ''
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
  }, [expanded, triggerExpand])

  return (
    <StyledNav className={className}>
      <Container
        ref={navigationRef}
        data-animation={animation}
        data-expanded={expanded}
      >
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
        <ContentContainer>
          <Content
            gap={0.25}
            data-is-expanded={expanded}
            data-animation={animation}
          >
            {children}
          </Content>
          <StickyFooter data-expanded={expanded} data-animation={animation}>
            <Button
              variant="ghost"
              sentiment="neutral"
              size="small"
              icon={expanded ? 'arrow-left-double' : 'arrow-right-double'}
              onClick={triggerExpand}
            />
          </StickyFooter>
        </ContentContainer>
      </Container>
      <Slider ref={sliderRef} />
    </StyledNav>
  )
}

type NavigationProps = {
  children: ReactNode
  logo?: ReactNode | ((expanded: boolean) => ReactNode)
  pinnedFunctionality?: boolean
  initialPinned?: string[]
  initialExpanded?: boolean
  onClickPinUnpin?: (pinned: string[]) => void
  locales?: typeof NavigationLocales
  pinLimit?: number
  onClickExpand?: () => void
}

export const Navigation = ({
  children,
  logo,
  pinnedFunctionality,
  onClickPinUnpin,
  onClickExpand,
  initialPinned,
  initialExpanded = true,
  locales = NavigationLocales,
  pinLimit = 7,
}: NavigationProps) => (
  <NavigationProvider
    onClickPinUnpin={onClickPinUnpin}
    pinnedFunctionality={pinnedFunctionality}
    locales={locales}
    initialPinned={initialPinned}
    pinLimit={pinLimit}
    initialExpanded={initialExpanded}
  >
    <NavigationContent onClickExpand={onClickExpand} logo={logo}>
      {children}
    </NavigationContent>
  </NavigationProvider>
)

Navigation.Group = Group
Navigation.Item = Item
Navigation.PinnedItems = PinnedItems
