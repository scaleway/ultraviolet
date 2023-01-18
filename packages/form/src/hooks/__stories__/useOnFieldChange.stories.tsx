import { Label, Stack } from '@scaleway/ui'
import type { Meta, Story } from '@storybook/react'
import { useState } from 'react'
import { Form, useOnFieldChange } from '../..'
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
    name: {
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
        defaultValue: { summary: true },
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
        <Label>Email</Label>
        <TextInputField name="email" noTopLabel valid={valid} />
      </Stack>
      <Stack gap={1}>
        <Label>Password</Label>
        <TextInputField name="password" noTopLabel />
      </Stack>
    </Stack>
  )
}

export const Usage: Story = () => (
  <Form
    initialValues={{ email: 'test@test.com' }}
    onRawSubmit={() => {}}
    errors={mockErrors}
  >
    <FormContent />
  </Form>
)
