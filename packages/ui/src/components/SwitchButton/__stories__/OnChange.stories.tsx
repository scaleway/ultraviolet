import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { SwitchButton } from '../index'

export const OnChange: StoryFn<ComponentProps<typeof SwitchButton>> = () => {
  const [value, setValue] = useState('option1')

  return (
    <Stack gap={2}>
      <SwitchButton
        value={value}
        onChange={event => setValue(event.target.value)}
      >
        <SwitchButton.Option value="option1">Option1</SwitchButton.Option>
        <SwitchButton.Option value="option2">Option2</SwitchButton.Option>
        <SwitchButton.Option value="option3">Option3</SwitchButton.Option>
      </SwitchButton>
      Current value: {value}
    </Stack>
  )
}

OnChange.args = {
  value: 'option1',
}
