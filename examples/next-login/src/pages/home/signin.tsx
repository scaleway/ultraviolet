import { Text, Stack, Alert } from '@ultraviolet/ui'
import { Icon } from '@ultraviolet/icons'
import {
  Form,
  TextInputFieldV2,
  TextInputField,
  Submit,
  useForm,
  RadioField,
  DateField,
} from '@ultraviolet/form'
import { Theme, css, useTheme } from '@emotion/react'
import { useState } from 'react'

type FormValues = {
  email: string
  password: string
  gender: string
  firstname: string
  lastname: string
  birthdate: string
}
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const bodyStyle = (theme: Theme) => css`
  .form-box {
    margin: 5% 30% 5% 30%;
    background: ${theme.colors.secondary.background};
    padding: 2%;
  }

  .icon {
    margin-left: auto;
    margin-right: auto;
  }

  .info-text {
    margin-left: auto;
    margin-right: auto;
  }

  .age-input {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`

const SignIn = () => {
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
  const [tooYoung, setTooYoung] = useState(false)
  const [alertSubmit, setAlertSubmit] = useState(
    <Text as="div" variant="body">
      {' '}
    </Text>,
  )

  const handleSubmit = () => {
    const val = methods.getValues()
    console.log('click', values)
    let timeDiff = Math.abs(Date.now() - val.birthdate.getTime())
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25)
    if (age < 1) {
      setTooYoung(true)
      setAlertSubmit(
        <Alert sentiment="danger" closable>
          Must be 1+
        </Alert>,
      )
    } else {
      setTooYoung(false)
      setValues(val)
      setAlertSubmit(
        <Alert
          sentiment="success"
          title="Account Created"
          closable
          className="alert"
        >
          {val.gender} {val.firstname}, {age} year{age > 1 ? 's' : ''} old. Your
          email adress is {val.email}.{' '}
        </Alert>,
      )
      setTimeout(() => {
        setAlertSubmit(
          <Text as="div" variant="body">
            {' '}
          </Text>,
        )
      }, 5000)

      console.log('Too young ? ', tooYoung)
    }
  }

  return (
    <div css={bodyStyle(theme)}>
      <div className="form-box">
        <Form<FormValues> methods={methods} onRawSubmit={handleSubmit}>
          <Stack gap={1}>
            <div className="icon">
              <Icon name="profile" size="1.7em" />
            </div>
            <div>
              <Text as="div" placement="center" variant="heading">
                Sign in form
              </Text>
            </div>
            <div className="inputs">
              <Stack gap={2} direction="row">
                <RadioField name="gender" value="mr" required label="Mr." />
                <RadioField name="gender" value="mrs" required label="Mrs." />
              </Stack>
            </div>
            <Stack gap={3} direction="row">
              <TextInputFieldV2
                required
                label="First Name"
                name="firstname"
                placeholder="John"
                className="inputs"
              />
              <TextInputFieldV2
                required
                label="Last Name"
                name="lastname"
                placeholder="Smith"
                className="inputs"
              />
            </Stack>
            <div>
              <DateField
                name="birthdate"
                label="Birth Date"
                required
                className="age-input"
              />
            </div>
            <div>
              <TextInputFieldV2
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
              <Text as="div" variant="body">
                Password
              </Text>
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
              <Submit classname="submit-button">Create an account</Submit>
            </div>
          </Stack>
        </Form>
      </div>
      {alertSubmit}
    </div>
  )
}

export default SignIn
