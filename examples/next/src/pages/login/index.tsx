import { Stack, SwitchButton } from '@ultraviolet/ui'
import { useState } from 'react'
import LogIn from './login'
import SignUp from './signup'
import { page, switchButton } from './styles.css'

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
    <Stack className={page}>
      <SwitchButton
        className={switchButton}
        name="switch button"
        onChange={event => setTab((event.target as HTMLInputElement).value)}
        value="login"
      >
        <SwitchButton.Option value="login">Log In</SwitchButton.Option>
        <SwitchButton.Option value="signup">Sign Up</SwitchButton.Option>
      </SwitchButton>
      <Content tab={tab} />
    </Stack>
  )
}
export default Home
