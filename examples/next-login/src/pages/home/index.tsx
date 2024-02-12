import { useState } from 'react'
import LogIn from './login'
import SignIn from './signup'
import { SwitchButton, Stack } from '@ultraviolet/ui'
import styled from '@emotion/styled'

const StyledSwitchButton = styled(SwitchButton)`
  margin: auto;
`
const StyledPage = styled(Stack)`
  height: 100%;
  width: 100%;
`
const Home = () => {
  const [tab, setTab] = useState('login')
  return (
    <StyledPage>
      <StyledSwitchButton
        name="switch button"
        leftButton={{
          label: 'Log In',
          value: 'login',
        }}
        rightButton={{
          label: 'Sign Up',
          value: 'signup',
        }}
        value="login"
        onChange={event =>
          setTab((event.currentTarget as HTMLInputElement).value)
        }
      />
      {tab === 'login' ? <LogIn /> : <SignIn />}
    </StyledPage>
  )
}
export default Home
