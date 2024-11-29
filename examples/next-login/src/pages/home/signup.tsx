import { Alert, Stack, Text } from '@ultraviolet/ui'
import { ProfileIcon } from '@ultraviolet/icons'
import {
  DateField,
  Form,
  RadioGroupField,
  Submit,
  TextInputFieldV2,
  useForm,
  useWatch,
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

const StyledSignUpContainer = styled(Stack)`
  margin: 5vh 25vw;
  background: ${({ theme }) => theme.colors.secondary.background};
  padding: ${({ theme }) => theme.space['4']};
`

const StyledInput = styled(TextInputFieldV2)`
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
      <Alert sentiment="success" title="Account Created" closable>
        Welcome {values.gender} {values.firstname} {values.lastname}, {age}
        year{age > 1 ? 's' : ''} old. Your email adress is {values.email}.
      </Alert>
    )
  }
  if (alert === 'too young') {
    return (
      <Alert sentiment="danger" closable>
        Must be 1+
      </Alert>
    )
  }
  return null
}

const SignUp = () => {
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
        methods={methods}
        errors={mockErrors}
        onSubmit={handleSubmit}
      >
        <Stack gap={1} alignItems="center">
          <ProfileIcon size="1.7em" />
          <Text as="div" placement="center" variant="heading">
            Sign up form
          </Text>
          <Stack width="100%">
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
              regex={[EMAIL_REGEX]}
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
          </Stack>
          <Submit>Create an account</Submit>
        </Stack>
      </Form>
      <SignUpAlert alert={alertSubmit} values={values} age={age} />
    </StyledSignUpContainer>
  )
}

export default SignUp
