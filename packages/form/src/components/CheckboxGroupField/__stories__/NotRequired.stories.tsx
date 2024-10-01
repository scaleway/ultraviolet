import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import { CheckboxGroupField } from '..'
import { Submit } from '../..'

export const NotRequiredStory: StoryFn<typeof CheckboxGroupField> = args => (
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
      <CheckboxGroupField.Checkbox name="stuff" value="stuff">
        Accept to receive some other stuff
      </CheckboxGroupField.Checkbox>
    </CheckboxGroupField>
    <Submit>Submit</Submit>
  </Stack>
)

export const NotRequired: StoryFn<typeof CheckboxGroupField> = args => (
  <NotRequiredStory {...args} />
)

NotRequired.parameters = {
  docs: {
    description: {
      story: 'If none of them are required, the form should be valid.',
    },
  },
}

NotRequired.args = {
  name: 'conditions',
  legend: 'Conditions',
}
