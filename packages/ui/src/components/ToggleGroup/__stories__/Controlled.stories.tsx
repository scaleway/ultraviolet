import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { ToggleGroup } from '..'

export const Controlled: StoryFn = args => {
  const [values, onChange] = useState(['weekly-save'])

  return (
    <ToggleGroup
      {...args}
      legend="Choose options:"
      name="options"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const data = [...values]
        if (data.includes(e.currentTarget.value)) {
          data.splice(data.indexOf(e.currentTarget?.value), 1)
        } else {
          data.push(e.currentTarget.value)
        }
        onChange(data)
      }}
      value={values}
    >
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
      {JSON.stringify(values, null, 4)}
    </ToggleGroup>
  )
}

Controlled.parameters = {
  docs: {
    description: {
      story:
        'ToggleGroup only work as a controlled component. You need to pass `onChange` callback to control it.',
    },
  },
}
