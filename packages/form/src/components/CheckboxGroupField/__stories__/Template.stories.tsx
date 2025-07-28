import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { CheckboxGroupField } from '..'

const CheckboxGroupTemplate = (
  args: ComponentProps<typeof CheckboxGroupField>,
) => (
  <Stack gap={2}>
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
  </Stack>
)

export const Template: StoryFn<typeof CheckboxGroupField> = args => (
  <CheckboxGroupTemplate {...args} />
)

Template.args = {
  legend: 'Conditions',
  name: 'conditions',
}
