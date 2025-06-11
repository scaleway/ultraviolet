import type { Meta, StoryFn } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import { useState } from 'react'
import { Form, useForm, useOnFieldChange } from '../..'
import { TextInputField } from '../../components'
import { mockErrors } from '../../mocks'

export default {
  parameters: {
    docs: {
      description: {
        component: `\`useOnFieldChange()\` is a hook that allows you to listen to field changes and perform change actions.

In this example you have a simple form with email and password. When the email field changes the valid icon on the right will become invalid for 3 seconds and the become valid again.
This is possible because we will do: \`
const [valid, setValid] = useState(true)
useOnFieldChange('email', () => {
  setValid(false)
  setTimeout(() => {
    setValid(true)
  }, 3000)
})
\``,
      },
    },
  },
  argTypes: {
    argName: {
      description: 'Name of the field to listen to.',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {},
    },
    callback: {
      description: 'Function to call when the field changes.',
      table: {
        type: {
          summary: '(value: any, name: string) => void',
        },
      },
    },
    enabled: {
      description: 'Whether the callback should be called or not.',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: { summary: 'true' },
      },
    },
  },
  title: 'Form/Hooks/useOnFieldChange',
} as Meta

const FormContent = () => {
  const [valid, setValid] = useState(true)

  useOnFieldChange('email', () => {
    setValid(false)
    setTimeout(() => {
      setValid(true)
    }, 3000)
  })

  return (
    <Stack gap={2}>
      <Stack gap={1}>
        <Text as="label" variant="bodyStrong">
          Email
        </Text>
        <TextInputField name="email" helper={valid} />
      </Stack>
      <Stack gap={1}>
        <Text as="label" variant="bodyStrong">
          Password
        </Text>
        <TextInputField name="password" />
      </Stack>
    </Stack>
  )
}

export const Usage: StoryFn = () => {
  const methods = useForm({ defaultValues: { email: 'test@test.com' } })

  return (
    <Form methods={methods} onSubmit={() => {}} errors={mockErrors}>
      <FormContent />
    </Form>
  )
}
