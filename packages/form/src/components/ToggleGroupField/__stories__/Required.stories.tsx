import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import { useWatch } from 'react-hook-form'
import { ToggleGroupField } from '..'
import { Submit } from '../..'

export const RequiredStory: StoryFn<typeof ToggleGroupField> = args => {
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
        'Use the `required` prop to change make the whole group a required field.',
    },
  },
}

Required.args = {
  required: true,
}
