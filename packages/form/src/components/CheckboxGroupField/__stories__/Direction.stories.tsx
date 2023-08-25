import type { StoryFn } from '@storybook/react'
import { CheckboxGroupField } from '..'
import { Submit } from '../..'

export const Direction: StoryFn = () => (
  <>
    <CheckboxGroupField
      label="Legend label"
      name="direction"
      value={['value-1']}
      direction="row"
      required
    >
      <CheckboxGroupField.Checkbox name="label-1" value="value-1">
        Label 1
      </CheckboxGroupField.Checkbox>

      <CheckboxGroupField.Checkbox name="label-1" value="value-2">
        Label 2
      </CheckboxGroupField.Checkbox>
    </CheckboxGroupField>
    <Submit>Submit</Submit>
  </>
)

Direction.parameters = {
  docs: {
    storyDescription:
      'Use the `direction` prop to change the direction of the group.',
  },
}
