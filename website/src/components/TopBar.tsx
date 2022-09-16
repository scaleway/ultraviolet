import styled from '@emotion/styled'
import { Breakpoint, Col, Grid, Icon, Row, Toggle } from '@scaleway/ui'
import { ChangeEventHandler, useEffect } from 'react'
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
`
const HorizontalStack = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }): string => theme.space[0.5]};
`

type TopBarProps = {
  isLightMode: boolean
  setIsLightMode: (isLight: boolean) => void
}

const TopBar = ({ isLightMode, setIsLightMode }: TopBarProps): JSX.Element => {
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
      <Grid>
        <Row>
          <Col display="flex" justifyContent="flex-start" alignItems="center">
            <Logo width={124} height={24} />
          </Col>
          <Col display="flex" justifyContent="flex-end">
            <Breakpoint up="medium">
              <GithubAndDocumentationButtons />
            </Breakpoint>
            <HorizontalStack>
              <Icon size={20} name="moon" />
              <Toggle
                name="darkMode"
                checked={isLightMode}
                onChange={onChange}
              />
              <Icon size={20} name="sun" />
            </HorizontalStack>
          </Col>
        </Row>
      </Grid>
    </Header>
  )
}

export default TopBar
