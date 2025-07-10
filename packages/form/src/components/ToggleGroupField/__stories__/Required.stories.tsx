import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { ToggleGroupField } from '..'
import { Submit } from '../..'
import { useWatch } from '../../..'

export const RequiredStory = (
  args: ComponentProps<typeof ToggleGroupField>,
) => {
  const values = useWatch()

  return (
    <Stack gap={1}>
      <ToggleGroupField {...args}>
        <ToggleGroupField.Toggle
          name="weekly-save"
          value="weekly-save"
          label="Automatically run a save every monday at 6 am"
        />
        <ToggleGroupField.Toggle
          name="daily-reboot"
          value="daily-reboot"
          label="Reboot server every day at 9 am"
        />
      </ToggleGroupField>
      <Submit>Submit</Submit>
      <span>
        <b>Form content:</b> {JSON.stringify(values)}
      </span>
    </Stack>
  )
}

export const Required: StoryFn<typeof ToggleGroupField> = args => (
  <RequiredStory {...args} />
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
