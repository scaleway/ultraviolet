import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import { useFormState } from 'react-final-form'
import { CheckboxGroupField } from '..'

const CheckboxGroupFieldStory: StoryFn<typeof CheckboxGroupField> = args => {
  const { values } = useFormState()

  return (
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
      <span>
        <b>Form content:</b> {JSON.stringify(values)}
      </span>
    </Stack>
  )
}

export const Template: StoryFn<typeof CheckboxGroupField> = args => (
  <CheckboxGroupFieldStory {...args} />
)

Template.args = {
  name: 'conditions',
  label: 'Conditions',
  value: ['termsAndConditions'],
}
