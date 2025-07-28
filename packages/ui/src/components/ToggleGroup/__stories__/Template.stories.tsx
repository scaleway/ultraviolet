import type { StoryFn } from '@storybook/react-vite'
import { ToggleGroup } from '..'

export const Template: StoryFn<typeof ToggleGroup> = args => (
  <ToggleGroup {...args}>
    <ToggleGroup.Toggle
      label="Automatically run a save every monday at 6 am"
      name="weekly-save"
      value="weekly-save"
    />
    <ToggleGroup.Toggle
      label="Reboot server every day at 9 am"
      name="daily-reboot"
      value="daily-reboot"
    />
  </ToggleGroup>
)

Template.args = {
  legend: 'Choose options:',
  name: 'options',
  value: ['value-2'],
}
