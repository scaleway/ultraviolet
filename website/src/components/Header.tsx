import styled from '@emotion/styled'
import { Breakpoint, Icon, Toggle } from '@scaleway/ui'
import { APP_MAX_WIDTH } from '../constants'
import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'
import { useTheme } from '@emotion/react'

const Header = styled.header`
  min-height: 60px;
  height: 60px;
  top: 0;
  background-color: ${({ theme }): string =>
    theme.colors.neutral.backgroundWeak};
  box-shadow: 0 0 8px 2px rgba(178, 182, 195, 0.37);
  display: flex;
  align-items: center;
  min-width: 10px;
  padding: 8px 10px;
  width: 100%;
  justify-content: center;
  position: sticky;
  z-index: 1;
`
const HorizontalStack = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }): string => theme.space['1']};
`

const HeaderRow = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  max-width: ${APP_MAX_WIDTH}px;
`

const TopBar = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Header>
      <HeaderRow>
        <Logo />
        <HorizontalStack>
          <Breakpoint up="medium">
            <GithubAndDocumentationButtons />
          </Breakpoint>
          <Icon size={20} name="sun" />
          <Toggle
            name="darkMode"
            checked={theme === 'dark'}
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <Icon size={20} name="moon" />
        </HorizontalStack>
      </HeaderRow>
    </Header>
  )
}

export default TopBar
