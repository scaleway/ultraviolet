import styled from '@emotion/styled'
import { Button, Stack } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Group } from './Group'
import { Item } from './Item'
import { NavigationProvider, useNavigation } from './NavigationProvider'
import { PinnedItems } from './PinnedItems'
import NavigationLocales from './locales/en'

const ANIMATION_DURATION = 300

const StyledNav = styled.nav`
  transition: width ${ANIMATION_DURATION}ms ease-in-out;
  &[data-disabled-width-animation='true'] {
    transition: none;
  }

  width: 280px;

  &[data-expanded='true'] {
    max-width: 320px;
    min-width: 220px;
  }

  &[data-expanded='false'] {
    width: 64px;
  }

  display: flex;
  flex-direction: row;
  position: relative;
`

const Container = styled.div`
  background: ${({ theme }) => theme.colors.neutral.background};
  display: flex;
  flex-direction: column;
`

const StickyFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  background: ${({ theme }) => theme.colors.neutral.background};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  padding: ${({ theme }) => `${theme.space['1']} ${theme.space['2']}`};
`

const Header = styled.div`
  background: ${({ theme }) => theme.colors.neutral.background};
`

const LogoContainer = styled(Stack)`
  padding: ${({ theme }) =>
    `${theme.space['3']} ${theme.space['2']} ${theme.space['2']} ${theme.space['2']}`};
`

const ContentContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  transition: opacity ${ANIMATION_DURATION - 150}ms ease-in-out;

  &[data-animation='true'] {
    opacity: 0;
  }
`

const Content = styled(Stack)`
  overflow: auto;
  flex-grow: 1;
  padding: ${({ theme }) => theme.space['2']};
`

const Slider = styled.div`
  background: transparent;
  cursor: col-resize;
  border: 2px solid transparent;
  margin-right: -2px;
  display: flex;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.primary.border};
  }
`

type NavigationContentProps = {
  children: ReactNode
  logo?: ReactNode | ((expanded: boolean) => ReactNode)
  className?: string
}

const NavigationContent = ({
  children,
  logo,
  className,
}: NavigationContentProps) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const navigationRef = useRef<HTMLDivElement>(null)

  const [disabledWidthAnimation, setDisabledWidthAnimation] = useState(false)

  const { expanded, setExpanded } = useNavigation()
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)

  useEffect(() => {
    let prevX: number
    let navRect: DOMRect | undefined
    let shouldCollapseOnMouseUp = false

    const mouseMove = (event: MouseEvent) => {
      if (prevX !== undefined) {
        const navWidth = navRect?.width ?? 0
        const newWidth = navWidth + (event.clientX - prevX)

        if (navigationRef.current && expanded) {
          navigationRef.current.style.width = `${newWidth}px`
        }

        console.log(newWidth)
        if (newWidth <= 220) {
          shouldCollapseOnMouseUp = true
        } else {
          shouldCollapseOnMouseUp = false
        }
      }
    }

    const mousedown = (event: MouseEvent) => {
      setDisabledWidthAnimation(true)

      document.body.style.pointerEvents = 'none'
      document.body.style.userSelect = 'none'

      prevX = event.clientX
      navRect = navigationRef.current?.getBoundingClientRect()

      const mouseup = () => {
        setDisabledWidthAnimation(false)
        if (shouldCollapseOnMouseUp) {
          setExpanded()
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
  }, [])

  // This function will be triggered when expand/collapse button is clicked
  // It will also trigger a fade out animation when expanding the navigation
  const triggerExpand = () => {
    if (!expanded) {
      setIsAnimationPlaying(true)
      setTimeout(() => {
        setIsAnimationPlaying(false)
        setExpanded()
      }, ANIMATION_DURATION)
    } else {
      setExpanded()
    }
  }

  return (
    <StyledNav
      data-expanded={expanded || isAnimationPlaying}
      className={className}
      ref={navigationRef}
      data-disabled-width-animation={disabledWidthAnimation}
    >
      <Container>
        <Header>
          <LogoContainer
            justifyContent={!expanded ? 'center' : undefined}
            alignItems={!expanded ? 'center' : undefined}
            data-animation={isAnimationPlaying}
          >
            {typeof logo === 'function' ? logo(expanded) : logo}
          </LogoContainer>
        </Header>
        <ContentContainer data-animation={isAnimationPlaying}>
          <Content gap={0.25}>{children}</Content>
          <StickyFooter>
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
  onClickPinUnpin?: (pinned: string[]) => void
  locales?: typeof NavigationLocales
  pinLimit?: number
}

export const Navigation = ({
  children,
  logo,
  pinnedFunctionality,
  onClickPinUnpin,
  initialPinned,
  locales = NavigationLocales,
  pinLimit = 7,
}: NavigationProps) => (
  <NavigationProvider
    onClickPinUnpin={onClickPinUnpin}
    pinnedFunctionality={pinnedFunctionality}
    locales={locales}
    initialPinned={initialPinned}
    pinLimit={pinLimit}
  >
    <NavigationContent logo={logo}>{children}</NavigationContent>
  </NavigationProvider>
)

Navigation.Group = Group
Navigation.Item = Item
Navigation.PinnedItems = PinnedItems
