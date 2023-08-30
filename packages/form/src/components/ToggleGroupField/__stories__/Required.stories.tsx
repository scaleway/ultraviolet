import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import { useFormState } from 'react-final-form'
import { ToggleGroupField } from '..'
import { Submit } from '../..'

export const RequiredStory: StoryFn<typeof ToggleGroupField> = args => {
  const { values } = useFormState()

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
    storyDescription:
      'Use the `direction` prop to change the direction of the group.',
  },
}

Required.args = {
  required: true,
}
