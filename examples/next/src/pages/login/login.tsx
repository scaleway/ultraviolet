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
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    mode: 'onChange',
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
      <Form errors={mockErrors} methods={methods} onSubmit={handleSubmit}>
        <Stack alignItems="center" gap={1}>
          <IdIcon size="small" />
          <Text as="h1" variant="heading">
            Login form
          </Text>
          <StyledInput
            label="Email"
            name="email"
            placeholder="example@email.com"
            regex={[emailRegex]}
            required
          />
          <StyledInput
            helper="Min 8 characters"
            label="Password"
            minLength={8}
            name="password"
            required
            type="password"
          />
          <CheckboxField name="remember">Remember me</CheckboxField>
          <Submit>Log in</Submit>
          <Link href="/" prominence="weak" sentiment="primary" size="small">
            Forgot password?
          </Link>
        </Stack>
      </Form>
      {loginText}
    </StyledLoginContainer>
  )
}

export default LogIn
