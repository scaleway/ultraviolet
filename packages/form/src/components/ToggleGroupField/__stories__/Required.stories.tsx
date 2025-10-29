import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import { Submit } from '../..'
import { ToggleGroupField } from '..'

export const Required: StoryFn<typeof ToggleGroupField> = args => (
  <Stack gap={1}>
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
    <Submit>Submit</Submit>
  </Stack>
)

Required.parameters = {
  docs: {
    description: {
      story:
        'Use the `required` prop to change make the whole group a required field. Doing so will require at least one option to be selected.',
    },
  },
}

Required.args = {
  required: true,
}
