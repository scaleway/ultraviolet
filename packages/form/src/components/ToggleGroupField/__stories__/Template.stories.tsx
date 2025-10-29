import type { StoryFn } from '@storybook/react-vite'
import { ToggleGroupField } from '..'

export const Template: StoryFn<typeof ToggleGroupField> = args => (
  <ToggleGroupField {...args}>
    <ToggleGroupField.Toggle
      label="Automatically run a save every monday at 6 am"
      name="weekly-save"
      value="weekly-save"
    />
    <ToggleGroupField.Toggle
      label="Reboot server every day at 9 am"
      name="daily-reboot"
      value="daily-reboot"
    />
  </ToggleGroupField>
)

Template.args = {
  legend: 'Choose options:',
  name: 'options',
}
