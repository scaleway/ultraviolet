import { useState } from 'react'
import LogIn from './login'
import SignIn from './signin'
import { SwitchButton } from '@ultraviolet/ui'
import { css } from '@emotion/react'
const swichButtonStyle = css`
  margin-left: 43%;
`
const Home = () => {
  const [tab, setTab] = useState('login')
  return (
    <>
      <div className="switch-button" css={swichButtonStyle}>
        <SwitchButton
          leftButton={{
            label: 'Log In',
            value: 'login',
          }}
          rightButton={{
            label: 'Sign In',
            value: 'signin',
          }}
          value="login"
          onChange={e => setTab(e.target.value)}
        />
      </div>
      {tab === 'login' ? <LogIn /> : <SignIn />}
    </>
  )
}
export default Home
