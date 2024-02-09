import { Text, Link, Stack, Modal } from '@ultraviolet/ui'
import { Icon } from '@ultraviolet/icons'
import {
  Form,
  TextInputField,
  Submit,
  CheckboxField,
  useForm,
} from '@ultraviolet/form'
import { Theme, css, useTheme } from '@emotion/react'
import { useState } from 'react'

type FormValues = {
  email: string
  password: string
  remember: boolean
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const mockErrors = {
  maxDate: ({ maxDate }) => `Date must be lower than ${maxDate?.toString()}`,
  maxLength: ({ maxLength }) =>
    `This field should have a length lower than ${maxLength}`,
  minDate: ({ minDate }) => `Date must be greater than ${minDate?.toString()}`,
  minLength: ({ minLength }) =>
    `This field should have a length greater than ${minLength}`,
  pattern: () => `This field should match the regex`,
  required: () => 'This field is required',
  max: ({ max }) => `This field is too high (maximum is : ${max})`,
  min: ({ min }) => `This field is too low (minimum is: ${min})`,
}
const bodyStyle = (theme: Theme) => css`
  .form-box {
    margin: 5% 30% 5% 30%;
    background: ${theme.colors.primary.background};
    padding: 2%;
  }

  .inputs {
    padding: 10px 30px 10px 30px;
  }

  .icon {
    margin-left: auto;
    margin-right: auto;
  }

  .info-text {
    margin-left: auto;
    margin-right: auto;
  }
`
const LogIn = () => {
  const theme = useTheme()
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
    console.log(val)
    setValues(val)
    setLoginText(
      <ul>
        Welcome {val.email}. <li>Rember me checked : {String(val.remember)}</li>
      </ul>,
    )
    setTimeout(() => setLoginText(<></>), 3000)
  }

  return (
    <div css={bodyStyle(theme)}>
      <div className="form-box">
        <Form<FormValues>
          methods={methods}
          errors={mockErrors}
          onRawSubmit={handleSubmit}
        >
          <Stack gap={1}>
            <div className="icon">
              <Icon name="id" size="1.7em" />
            </div>
            <div>
              <Text as="div" placement="center" variant="heading">
                Login form
              </Text>
            </div>
            <div>
              <TextInputField
                label="Email"
                name="email"
                required
                placeholder="example@email.com"
                rules={{
                  pattern: { value: emailRegex, message: 'Invalid format' },
                }}
                className="inputs"
              />
            </div>

            <div>
              <TextInputField
                label="Password"
                name="password"
                type="password"
                required
                minLength={8}
                notice="Min 8 characters"
                className="inputs"
              />
            </div>
            <div className="info-text">
              <CheckboxField name="remember">
                <Text as="div" variant="body">
                  Remember me
                </Text>
              </CheckboxField>
            </div>

            <div className="info-text">
              <Submit classname="submit-button">Log in</Submit>
            </div>
            <div className="info-text">
              <Modal
                disclosure={
                  <Link sentiment="primary" size="small" prominence="weak">
                    Forgot password?
                  </Link>
                }
              >
                <div>
                  Inputs:{' '}
                  <ul>
                    <li>Email: {values.email}</li>
                    <li>Password: {methods.getValues().password}</li>
                  </ul>{' '}
                </div>
              </Modal>
            </div>
          </Stack>
        </Form>
        {loginText}
      </div>
    </div>
  )
}

export default LogIn
