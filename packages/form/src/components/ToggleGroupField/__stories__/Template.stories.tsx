import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useWatch } from '../../..'
import { ToggleGroupField } from '..'

const ToggleGroupFieldStory = (
  args: ComponentProps<typeof ToggleGroupField>,
) => {
  const values = useWatch()

  return (
    <Stack gap={2}>
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
      <span>
        <b>Form content:</b> {JSON.stringify(values)}
      </span>
    </Stack>
  )
}

export const Template: StoryFn<typeof ToggleGroupField> = args => (
  <ToggleGroupFieldStory {...args} />
)

Template.args = {
  name: 'options',
  legend: 'Choose options:',
}
