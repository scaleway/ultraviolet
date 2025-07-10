import type { StoryFn } from '@storybook/react-vite'
import { ToggleGroup } from '..'

export const Template: StoryFn<typeof ToggleGroup> = args => (
  <ToggleGroup {...args}>
    <ToggleGroup.Toggle
      name="weekly-save"
      value="weekly-save"
      label="Automatically run a save every monday at 6 am"
    />
    <ToggleGroup.Toggle
      name="daily-reboot"
      value="daily-reboot"
      label="Reboot server every day at 9 am"
    />
  </ToggleGroup>
)

Template.args = {
  name: 'options',
  legend: 'Choose options:',
  value: ['value-2'],
}
