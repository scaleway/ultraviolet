import { Checkbox, Stack } from '@scaleway/ui'
import type { ComponentStory } from '@storybook/react'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import {
  CheckboxField,
  DateField,
  Form,
  RadioField,
  RichSelectField,
  Submit,
  SubmitErrorAlert,
  TagsField,
  TextBoxField,
  TimeField,
  ToggleField,
} from '../..'
import { emailRegex, mockErrors } from '../../../mocks/mockErrors'

export const Playground: ComponentStory<typeof Form> = args => {
  const [state, setState] = useState(false)

  return (
    <Form {...args}>
      <Stack gap={3}>
        <Checkbox
          checked={state}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setState(event.target.checked)
          }
        >
          I&apos;m disabling the field name to remove validation
        </Checkbox>
        <Stack gap={2} direction="row">
          <RadioField name="choice" value="1" required>
            1
          </RadioField>
          <RadioField name="choice" value="2" required>
            2
          </RadioField>
          <RadioField name="choice" value="3" required>
            3
          </RadioField>
        </Stack>

        <Stack gap={2} direction="row">
          <DateField name="date" label="Date" required />
          <TimeField name="time" required />
        </Stack>

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

        <RichSelectField name="select" required>
          <RichSelectField.Option value="1">1</RichSelectField.Option>
          <RichSelectField.Option value="2">2</RichSelectField.Option>
        </RichSelectField>

        <TagsField name="tags" placeholder="Tags..." />

        <Stack gap={2} direction="row" justifyContent="center">
          <CheckboxField name="receiveEmailUpdates">
            I&apos;d like to receive news updates
          </CheckboxField>

          <ToggleField name="receiveEmailUpdates" label="Toggle" />
        </Stack>

        <SubmitErrorAlert />
        <Submit>Submit</Submit>
      </Stack>
    </Form>
  )
}

Playground.args = {
  errors: mockErrors,
  initialValues: {
    receiveEmailUpdates: true,
    choice: '2',
    tags: ['cloud', 'of', 'choice'],
  },
  onRawSubmit: values => {
    console.log('Submit', values)
  },
}
