import { Text, Link, Stack } from '@ultraviolet/ui'
import { IdIcon } from '@ultraviolet/icons'
import {
  Form,
  TextInputField,
  Submit,
  CheckboxField,
  useForm,
  useWatch,
} from '@ultraviolet/form'
import { useState } from 'react'
import styled from '@emotion/styled'
import { EMAIL_REGEX, mockErrors } from '../../constants'

type FormValues = {
  email: string
  password: string
  remember: boolean
}

const StyledLoginContainer = styled(Stack)`
  margin: 5vh 30vw;
  background: ${({ theme }) => theme.colors.primary.background};
  padding: ${({ theme }) => theme.space['4']};
`

const StyledInput = styled(TextInputField)`
  padding: ${({ theme }) => theme.space['1.5']}
    ${({ theme }) => theme.space['5']};
  width: 100%;
`

const LogIn = () => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  const values = useWatch(methods)
  const [loginText, setLoginText] = useState('')
  const handleSubmit = (val: FormValues) => {
    setLoginText(
      `
        Welcome ${val.email}. Remember me checked: ${String(val.remember)}
      `,
    )
    setTimeout(() => setLoginText(''), 3000)
    console.log('Values :', values)
  }

  return (
    <StyledLoginContainer>
      <Form methods={methods} errors={mockErrors} onSubmit={handleSubmit}>
        <Stack gap={1} alignItems="center">
          <IdIcon size="1.7em" />
          <Text as="h1" variant="heading">
            Login form
          </Text>
          <StyledInput
            label="Email"
            name="email"
            required
            placeholder="example@email.com"
            regex={[EMAIL_REGEX]}
          />
          <StyledInput
            label="Password"
            name="password"
            type="password"
            required
            minLength={8}
            notice="Min 8 characters"
          />
          <CheckboxField name="remember">Remember me</CheckboxField>
          <Submit>Log in</Submit>
          <Link sentiment="primary" size="small" prominence="weak" href="/">
            Forgot password?
          </Link>
        </Stack>
      </Form>
      {loginText}
    </StyledLoginContainer>
  )
}

export default LogIn
