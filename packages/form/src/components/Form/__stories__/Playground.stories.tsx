import type { StoryFn } from '@storybook/react'
import { Checkbox, Stack } from '@ultraviolet/ui'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import {
  CheckboxField,
  DateField,
  Form,
  RadioField,
  SelectInputField,
  SelectableCardField,
  Submit,
  SubmitErrorAlert,
  TagInputField,
  TextInputField,
  TimeField,
  ToggleField,
} from '../..'
import { emailRegex, mockErrors } from '../../../mocks/mockErrors'

export const Playground: StoryFn<typeof Form> = args => {
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
          <RadioField name="choice" value="1" required label="1" />
          <RadioField name="choice" value="2" required label="2" />
          <RadioField name="choice" value="3" required label="3" />
        </Stack>

        <Stack gap={2} direction="row">
          <DateField name="date" label="Date" required />
          <TimeField name="time" required />
        </Stack>

        <Stack gap={2} direction="row">
          <SelectableCardField name="selectableCard" value="1" required>
            Selectable Card 1
          </SelectableCardField>
          <SelectableCardField name="selectableCard" value="2" required>
            Selectable Card 2
          </SelectableCardField>
          <SelectableCardField name="selectableCard" value="3" required>
            Selectable Card 3
          </SelectableCardField>
        </Stack>

        <TextInputField
          name="name"
          label="Name"
          placeholder="John"
          required
          autoComplete="given-name"
          disabled={state}
        />
        <TextInputField
          name="email"
          label="Email"
          type="email"
          placeholder="john.smith@email.com"
          required
          regex={[emailRegex]}
        />

        <SelectInputField name="select" required>
          <SelectInputField.Option value="1">1</SelectInputField.Option>
          <SelectInputField.Option value="2">2</SelectInputField.Option>
        </SelectInputField>

        <TagInputField name="taginput" placeholder="TagInput..." />

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
    selectableCard: '1',
  },
  onRawSubmit: values => {
    console.log('Submit', values)
  },
}
