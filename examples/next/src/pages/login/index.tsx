import styled from '@emotion/styled'
import { Stack, SwitchButton } from '@ultraviolet/ui'
import { useState } from 'react'
import LogIn from './login'
import SignUp from './signup'

const StyledSwitchButton = styled(SwitchButton)`
  margin: auto;
`
const StyledPage = styled(Stack)`
  height: 100%;
  width: 100%;
`
const Content = (props: { tab: string }) => {
  let tabLoaded = undefined
  switch (props.tab) {
    case 'login': {
      tabLoaded = <LogIn />
      break
    }

    default: {
      tabLoaded = <SignUp />
    }
  }
  return tabLoaded
}

const Home = () => {
  const [tab, setTab] = useState('login')

  return (
    <StyledPage>
      <StyledSwitchButton
        name="switch button"
        onChange={event => setTab((event.target as HTMLInputElement).value)}
        value="login"
      >
        <SwitchButton.Option value="login">Log In</SwitchButton.Option>
        <SwitchButton.Option value="signup">Sign Up</SwitchButton.Option>
      </StyledSwitchButton>
      <Content tab={tab} />
    </StyledPage>
  )
}
export default Home
