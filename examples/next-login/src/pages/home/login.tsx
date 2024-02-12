import { Text, Link, Stack } from '@ultraviolet/ui'
import { Icon } from '@ultraviolet/icons'
import {
  Form,
  TextInputField,
  Submit,
  CheckboxField,
  useForm,
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
  margin: 3% 30% 3% 30%;
  background: ${({ theme }) => theme.colors.primary.background};
  padding: 2%;
`

const StyledInput = styled(TextInputField)`
  padding: 10px 30px 10px 30px;
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

  const [values, setValues] = useState(methods.watch())
  const [loginText, setLoginText] = useState(<></>)
  const handleSubmit = () => {
    const val = methods.getValues()
    setValues(val)
    setLoginText(
      <ul>
        Welcome {val.email}. <li>Rember me checked : {String(val.remember)}</li>
      </ul>,
    )
    setTimeout(() => setLoginText(<></>), 3000)
    console.log('Values :', values)
  }

  return (
    <StyledLoginContainer>
      <Form<FormValues>
        methods={methods}
        errors={mockErrors}
        onRawSubmit={handleSubmit}
      >
        <Stack gap={1} alignItems="center">
          <Icon name="id" size="1.7em" />
          <Text as="div" variant="heading">
            Login form
          </Text>
          <StyledInput
            label="Email"
            name="email"
            required
            placeholder="example@email.com"
            rules={{
              pattern: { value: EMAIL_REGEX, message: 'Invalid format' },
            }}
          />
          <StyledInput
            label="Password"
            name="password"
            type="password"
            required
            minLength={8}
            notice="Min 8 characters"
          />
          <CheckboxField name="remember">
            <Text as="div" variant="body" placement="center">
              Remember me
            </Text>
          </CheckboxField>
          <Submit>Log in</Submit>
          <Link sentiment="primary" size="small" prominence="weak" href="/">
            <Text as="div" variant="bodySmall">
              Forgot password?
            </Text>
          </Link>
        </Stack>
      </Form>
      {loginText}
    </StyledLoginContainer>
  )
}

export default LogIn
