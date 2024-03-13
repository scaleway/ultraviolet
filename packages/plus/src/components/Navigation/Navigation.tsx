import styled from '@emotion/styled'
import { Button, Stack } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Group } from './Group'
import { Item } from './Item'
import { NavigationProvider, useNavigation } from './NavigationProvider'
import { PinnedItems } from './PinnedItems'
import NavigationLocales from './locales/en'

const ANIMATION_DURATION = 300

const StyledNav = styled.nav`
  transition: width ${ANIMATION_DURATION}ms ease-in-out;
  width: 280px;

  &[data-expanded='false'] {
    width: 64px;
  }

  background: ${({ theme }) => theme.colors.neutral.background};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
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

const Container = styled.div`
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

type NavigationContentProps = {
  children: ReactNode
  logo?: ReactNode | ((expanded: boolean) => ReactNode)
}

const NavigationContent = ({ children, logo }: NavigationContentProps) => {
  const { expanded, setExpanded } = useNavigation()
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)

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
    <StyledNav data-expanded={expanded || isAnimationPlaying}>
      <Header>
        <LogoContainer
          justifyContent={!expanded ? 'center' : undefined}
          alignItems={!expanded ? 'center' : undefined}
          data-animation={isAnimationPlaying}
        >
          {typeof logo === 'function' ? logo(expanded) : logo}
        </LogoContainer>
      </Header>
      <Container data-animation={isAnimationPlaying}>
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
      </Container>
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
