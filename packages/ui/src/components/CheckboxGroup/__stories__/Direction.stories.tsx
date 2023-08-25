import type { StoryFn } from '@storybook/react'
import { CheckboxGroup } from '..'

export const Direction: StoryFn = () => (
  <CheckboxGroup
    label="Legend label"
    name="direction"
    value={['label-1']}
    onChange={() => {}}
    direction="row"
  >
    <CheckboxGroup.Checkbox name="label-1" value="label-1">
      Label 1
    </CheckboxGroup.Checkbox>

    <CheckboxGroup.Checkbox name="label-2" value="label-2">
      Label 2
    </CheckboxGroup.Checkbox>
  </CheckboxGroup>
)

Direction.parameters = {
  docs: {
    storyDescription:
      'Use the `direction` prop to change the direction of the group.',
  },
}
