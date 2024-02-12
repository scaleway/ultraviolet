import { Text, Stack, Alert } from '@ultraviolet/ui'
import { Icon } from '@ultraviolet/icons'
import {
  Form,
  TextInputFieldV2,
  Submit,
  useForm,
  RadioGroupField,
  DateField,
} from '@ultraviolet/form'
import { useState } from 'react'
import styled from '@emotion/styled'
import { EMAIL_REGEX, mockErrors } from '../../constants'

type FormValues = {
  email: string
  password: string
  gender: string
  firstname: string
  lastname: string
  birthdate: Date
}

const StyledSigninContainer = styled(Stack)`
  margin: 3% 30% 3% 30%;
  background: ${({ theme }) => theme.colors.secondary.background};
  padding: 2%;
`

const StyledInput = styled(TextInputFieldV2)`
  padding: 10px 0px;
  width: 100%;
`

const InputsContainer = styled(Stack)`
  width: 100%;
`

const SignIn = () => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      gender: '',
      firstname: '',
      lastname: '',
      birthdate: new Date(),
    },
  })
  const [values, setValues] = useState(methods.watch())
  const [tooYoung, setTooYoung] = useState(false)
  const [alertSubmit, setAlertSubmit] = useState('')
  const [age, setAge] = useState(0)

  const handleSubmit = () => {
    const val = methods.getValues()
    let timeDiff = Math.abs(Date.now() - val.birthdate.getTime())
    const computedAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25)
    setAge(computedAge)
    if (computedAge < 1) {
      setTooYoung(true)
      setAlertSubmit('error')
    } else {
      setTooYoung(false)
      setValues(val)
      setAlertSubmit('success')
      setTimeout(() => {
        setAlertSubmit('')
      }, 5000)

      console.log('Too young ? ', tooYoung)
      console.log('Values', values)
    }
  }
  const displayAlert = () => {
    if (alertSubmit === 'success') {
      return (
        <Alert sentiment="success" title="Account Created" closable>
          Welcome {values.gender} {values.firstname} {values.lastname}, {age}{' '}
          year{age > 1 ? 's' : ''} old. Your email adress is {values.email}.{' '}
        </Alert>
      )
    }
    if (alertSubmit === 'error') {
      return (
        <Alert sentiment="danger" closable>
          Must be 1+
        </Alert>
      )
    }
    return <></>
  }
  return (
    <StyledSigninContainer>
      <Form<FormValues>
        methods={methods}
        errors={mockErrors}
        onRawSubmit={handleSubmit}
      >
        <Stack gap={1} alignItems="center">
          <Icon name="profile" size="1.7em" />
          <Text as="div" placement="center" variant="heading">
            Sign up form
          </Text>
          <InputsContainer>
            <RadioGroupField name="gender" direction="row">
              <RadioGroupField.Radio name="mr" value="mr" label="Mr" />
              <RadioGroupField.Radio name="mrs" value="mrs" label="Mrs" />
            </RadioGroupField>
            <Stack gap={3} direction="row">
              <StyledInput
                required
                label="First Name"
                name="firstname"
                placeholder="John"
                className="inputs"
              />
              <StyledInput
                required
                label="Last Name"
                name="lastname"
                placeholder="Smith"
                className="inputs"
              />
            </Stack>
            <DateField
              name="birthdate"
              label="Birth Date"
              required
              className="age-input"
            />
            <StyledInput
              label="Email"
              name="email"
              required
              placeholder="example@email.com"
              rules={{
                pattern: { value: EMAIL_REGEX, message: 'Invalid format' },
              }}
              className="inputs"
            />
            <StyledInput
              label="Password"
              name="password"
              type="password"
              required
              minLength={8}
              helper="Min 8 characters"
            />
          </InputsContainer>
          <Submit>Create an account</Submit>
        </Stack>
      </Form>
      {displayAlert()}
    </StyledSigninContainer>
  )
}

export default SignIn
