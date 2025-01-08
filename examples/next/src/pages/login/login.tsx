import styled from '@emotion/styled'
import { email as emailRegex } from '@scaleway/regex'
import {
  CheckboxField,
  Form,
  Submit,
  TextInputFieldV2,
  useForm,
  useWatch,
} from '@ultraviolet/form'
import { IdIcon } from '@ultraviolet/icons'
import { Link, Stack, Text } from '@ultraviolet/ui'
import { useState } from 'react'
import { mockErrors } from '../../constants'

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

const StyledInput = styled(TextInputFieldV2)`
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

    // oxlint-disable-next-line eslint/no-console
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
            regex={[emailRegex]}
          />
          <StyledInput
            label="Password"
            name="password"
            type="password"
            required
            minLength={8}
            helper="Min 8 characters"
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
