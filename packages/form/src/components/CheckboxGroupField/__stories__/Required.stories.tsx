import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import { useFormState } from 'react-final-form'
import { CheckboxGroupField } from '..'
import { Submit } from '../..'

export const RequiredStory: StoryFn<typeof CheckboxGroupField> = args => {
  const { values } = useFormState()

  return (
    <Stack gap={1}>
      <CheckboxGroupField {...args}>
        <CheckboxGroupField.Checkbox
          name="termsAndConditions"
          value="termsAndConditions"
        >
          Accept terms and conditions
        </CheckboxGroupField.Checkbox>
        <CheckboxGroupField.Checkbox name="newsletter" value="newsletter">
          Accept to receive newsletter
        </CheckboxGroupField.Checkbox>
      </CheckboxGroupField>
      <Submit>Submit</Submit>
      <span>
        <b>Form content:</b> {JSON.stringify(values)}
      </span>
    </Stack>
  )
}

export const Required: StoryFn<typeof CheckboxGroupField> = args => (
  <RequiredStory {...args} />
)

Required.parameters = {
  docs: {
    storyDescription:
      'Use the `direction` prop to change the direction of the group.',
  },
}

Required.args = {
  name: 'conditions',
  legend: 'Conditions',
  required: true,
}
