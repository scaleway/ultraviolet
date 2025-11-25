import { email as emailRegex } from '@scaleway/regex'
import {
  CheckboxField,
  Form,
  Submit,
  TextInputField,
  useForm,
  useWatch,
} from '@ultraviolet/form'
import { IdIcon } from '@ultraviolet/icons'
import { Link, Stack, Text } from '@ultraviolet/ui'
import { useState } from 'react'
import styles from '../../../styles/login.module.scss'
import { mockErrors } from '../../constants'

type FormValues = {
  email: string
  password: string
  remember: boolean
}

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
    <Stack className={styles.loginContainer}>
      <Form errors={mockErrors} methods={methods} onSubmit={handleSubmit}>
        <Stack alignItems="center" gap={1}>
          <IdIcon size="small" />
          <Text as="h1" variant="heading">
            Login form
          </Text>
          <TextInputField
            className={styles.loginInput}
            label="Email"
            name="email"
            placeholder="example@email.com"
            regex={[emailRegex]}
            required
          />
          <TextInputField
            className={styles.loginInput}
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
    </Stack>
  )
}

export default LogIn
