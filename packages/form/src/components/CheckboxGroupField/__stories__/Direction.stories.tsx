import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useFormContext } from '../../..'
import { CheckboxGroupField } from '..'

const DirectionTemplate = (args: ComponentProps<typeof CheckboxGroupField>) => {
  const { watch } = useFormContext()

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
      <span>
        <b>Form content:</b> {JSON.stringify(watch())}
      </span>
    </Stack>
  )
}

export const Direction: StoryFn<typeof CheckboxGroupField> = args => (
  <DirectionTemplate {...args} />
)

Direction.parameters = {
  docs: {
    description: {
      story: 'Use the `direction` prop to change the direction of the group.',
    },
  },
}

Direction.args = {
  name: 'conditions',
  legend: 'Conditions',
  direction: 'row',
}
