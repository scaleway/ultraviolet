import styled from '@emotion/styled'
import {
  DateInputField,
  Form,
  RadioGroupField,
  Submit,
  TextInputField,
  useForm,
  useWatch,
} from '@ultraviolet/form'
import { ProfileIcon } from '@ultraviolet/icons'
import { Alert, Stack, Text } from '@ultraviolet/ui'
import { useState } from 'react'
import { EMAIL_REGEX, mockErrors } from '../../constants'

type FormValues = {
  email: string
  password: string
  gender: string
  firstname: string
  lastname: string
  birthdate: Date
}

const StyledSignUpContainer = styled(Stack)`
  margin: 5vh 25vw;
  background: ${({ theme }) => theme.colors.secondary.background};
  padding: ${({ theme }) => theme.space['4']};
`

const StyledInput = styled(TextInputField)`
  padding: ${({ theme }) => theme.space['1.5']}
    ${({ theme }) => theme.space['0']};
  width: 100%;
`
type AlertProps = {
  alert: string
  values: {
    email?: string | undefined
    password?: string | undefined
    gender?: string | undefined
    firstname?: string | undefined
    lastname?: string | undefined
    birthdate?: Date | undefined
  }
  age: number
}
const SignUpAlert = ({ alert, values, age }: AlertProps) => {
  if (alert === 'success') {
    return (
      <Alert closable sentiment="success" title="Account Created">
        Welcome {values.gender} {values.firstname} {values.lastname}, {age}
        year{age > 1 ? 's' : ''} old. Your email adress is {values.email}.
      </Alert>
    )
  }
  if (alert === 'too young') {
    return (
      <Alert closable sentiment="danger">
        Must be 1+
      </Alert>
    )
  }
  return null
}

const SignUp = () => {
  const methods = useForm({
    defaultValues: {
      birthdate: new Date(),
      email: '',
      firstname: '',
      gender: '',
      lastname: '',
      password: '',
    },
    mode: 'onChange',
  })
  const values = useWatch({ control: methods.control })
  const [alertSubmit, setAlertSubmit] = useState('default')
  const [age, setAge] = useState(0)

  const handleSubmit = (val: FormValues) => {
    let timeDiff = Math.abs(Date.now() - val.birthdate.getTime())
    const computedAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25)
    setAge(computedAge)
    setAlertSubmit(computedAge < 1 ? 'too young' : 'success')
  }
  return (
    <StyledSignUpContainer>
      <Form<FormValues>
        errors={mockErrors}
        methods={methods}
        onSubmit={handleSubmit}
      >
        <Stack alignItems="center" gap={1}>
          <ProfileIcon size="small" />
          <Text as="div" placement="center" variant="heading">
            Sign up form
          </Text>
          <Stack width="100%">
            <RadioGroupField direction="row" name="gender">
              <RadioGroupField.Radio label="Mr" value="mr" />
              <RadioGroupField.Radio label="Mrs" value="mrs" />
            </RadioGroupField>
            <Stack direction="row" gap={3}>
              <StyledInput
                className="inputs"
                label="First Name"
                name="firstname"
                placeholder="John"
                required
              />
              <StyledInput
                className="inputs"
                label="Last Name"
                name="lastname"
                placeholder="Smith"
                required
              />
            </Stack>
            <DateInputField
              className="age-input"
              label="Birth Date"
              name="birthdate"
              required
            />
            <StyledInput
              className="inputs"
              label="Email"
              name="email"
              placeholder="example@email.com"
              regex={[EMAIL_REGEX]}
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
          </Stack>
          <Submit>Create an account</Submit>
        </Stack>
      </Form>
      <SignUpAlert age={age} alert={alertSubmit} values={values} />
    </StyledSignUpContainer>
  )
}

export default SignUp
