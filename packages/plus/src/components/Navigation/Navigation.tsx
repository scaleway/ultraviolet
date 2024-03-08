import styled from '@emotion/styled'
import { Button, Stack } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { Group } from './Group'
import { Item } from './Item'
import { NavigationProvider, useNavigation } from './NavigationProvider'

type NavigationProps = {
  children: ReactNode
  logo?: ReactNode | ((expanded: boolean) => ReactNode)
}

const StyledNav = styled.nav`
  transition: width 0.3s ease-in-out;
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

const Footer = styled.div`
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
  padding-top: ${({ theme }) => theme.space['3']};
  padding-bottom: ${({ theme }) => theme.space['2']};
`

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Content = styled(Stack)`
  overflow: auto;
  flex-grow: 1;
`

const NavigationContent = ({ children, logo }: NavigationProps) => {
  const { expanded, setExpanded } = useNavigation()

  return (
    <StyledNav data-expanded={expanded}>
      <Header>
        <LogoContainer
          justifyContent={!expanded ? 'center' : undefined}
          alignItems={!expanded ? 'center' : undefined}
        >
          {typeof logo === 'function' ? logo(expanded) : logo}
        </LogoContainer>
      </Header>
      <Container>
        <Content gap={0.25}>{children}</Content>
        <Footer>
          <Button
            variant="ghost"
            sentiment="neutral"
            size="small"
            icon={expanded ? 'arrow-left-double' : 'arrow-right-double'}
            onClick={() => setExpanded()}
          />
        </Footer>
      </Container>
    </StyledNav>
  )
}

export const Navigation = ({ children, logo }: NavigationProps) => (
  <NavigationProvider>
    <NavigationContent logo={logo}>{children}</NavigationContent>
  </NavigationProvider>
)

Navigation.Group = Group
Navigation.Item = Item
