import styled from '@emotion/styled'
import { Breakpoint, Icon, Toggle } from '@scaleway/ui'
import { ChangeEventHandler, useEffect } from 'react'
import { APP_MAX_WIDTH } from '../constants'
import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'

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

type TopBarProps = {
  isLightMode: boolean
  setIsLightMode: (isLight: boolean) => void
}

const TopBar = ({ isLightMode, setIsLightMode }: TopBarProps) => {
  useEffect(() => {
    const localStorageSettings = localStorage.getItem('settings') ?? '{}'
    const settings = JSON.parse(localStorageSettings) as ApplicationSettings
    if (settings) {
      setIsLightMode(settings.isLightMode)
    } else {
      const isNavigatorLightTheme = window.matchMedia(
        '(prefers-color-scheme: light)',
      ).matches
      setIsLightMode(isNavigatorLightTheme)
    }
  }, [setIsLightMode])

  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    setIsLightMode(event.target.checked)
  }

  return (
    <Header>
      <HeaderRow>
        <div>
          <Logo width={124} height={24} />
        </div>
        <HorizontalStack>
          <Breakpoint up="medium">
            <GithubAndDocumentationButtons />
          </Breakpoint>
          <Icon size={20} name="moon" />
          <Toggle name="darkMode" checked={isLightMode} onChange={onChange} />
          <Icon size={20} name="sun" />
        </HorizontalStack>
      </HeaderRow>
    </Header>
  )
}

export default TopBar
