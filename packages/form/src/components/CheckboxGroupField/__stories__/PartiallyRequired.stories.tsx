import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { CheckboxGroupField } from '..'
import { Submit } from '../..'

const PartiallyRequiredStory = (
  args: ComponentProps<typeof CheckboxGroupField>,
) => (
  <Stack gap={1}>
    <CheckboxGroupField {...args}>
      <CheckboxGroupField.Checkbox
        name="termsAndConditions"
        value="termsAndConditions"
        required
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

export const PartiallyRequired: StoryFn<typeof CheckboxGroupField> = args => (
  <PartiallyRequiredStory {...args} />
)

PartiallyRequired.parameters = {
  docs: {
    description: {
      story:
        'You can make some of the checkboxes required using the `required` prop on each of them. This way only the required checkboxes will be validated.',
    },
  },
}

PartiallyRequired.args = {
  name: 'conditions',
  legend: 'Conditions',
}
