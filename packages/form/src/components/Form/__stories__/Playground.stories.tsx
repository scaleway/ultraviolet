import { Checkbox, Stack } from '@scaleway/ui'
import type { ComponentStory } from '@storybook/react'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import {
  CheckboxField,
  Form,
  Submit,
  SubmitErrorAlert,
  TextBoxField,
} from '../..'
import { emailRegex, mockErrors } from '../../../mocks/mockErrors'

export const Playground: ComponentStory<typeof Form> = args => {
  const [state, setState] = useState(false)

  return (
    <Form {...args}>
      <Stack gap={2}>
        <Checkbox
          checked={state}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setState(event.target.checked)
          }
        >
          I&apos;m disabling the field name to remove validation
        </Checkbox>
        <TextBoxField
          name="name"
          label="Name"
          placeholder="John"
          required
          autoComplete="given-name"
          disabled={state}
        />
        <TextBoxField
          name="email"
          label="Email"
          type="email"
          placeholder="john.smith@email.com"
          required
          regex={[emailRegex]}
        />
        <CheckboxField name="receiveEmailUpdates">
          I&apos;d like to receive news updates
        </CheckboxField>
        <SubmitErrorAlert />
        <Submit>Submit</Submit>
      </Stack>
    </Form>
  )
}

Playground.args = {
  errors: mockErrors,
  initialValues: { receiveEmailUpdates: true },
}
