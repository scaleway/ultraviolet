import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../..'
import { CheckboxGroupField } from '..'

export const RequiredTemplate = (
  args: ComponentProps<typeof CheckboxGroupField>,
) => (
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
  </Stack>
)

export const Required: StoryFn<typeof CheckboxGroupField> = args => (
  <RequiredTemplate {...args} />
)

Required.parameters = {
  docs: {
    description: {
      story:
        'You can make the whole group required using the `required` prop. This way all checkboxes will be validated.',
    },
  },
}

Required.args = {
  name: 'conditions',
  legend: 'Conditions',
  required: true,
}
