import type { StoryFn } from '@storybook/react-vite'
import { MoonIcon, SunIcon } from '@ultraviolet/icons'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { SwitchButton } from '../index'

export const WithIcon: StoryFn<ComponentProps<typeof SwitchButton>> = args => (
  <SwitchButton {...args} size="small">
    <SwitchButton.Option value="option1">
      <Stack direction="row" alignItems="center">
        <SunIcon />
      </Stack>
    </SwitchButton.Option>
    <SwitchButton.Option value="option2">
      <Stack direction="row" alignItems="center">
        <MoonIcon />
      </Stack>
    </SwitchButton.Option>
  </SwitchButton>
)

WithIcon.args = {
  value: 'option1',
}

WithIcon.parameters = {
  docs: {
    description: {
      story: 'It is possible to have an icon instead of the label',
    },
  },
}
