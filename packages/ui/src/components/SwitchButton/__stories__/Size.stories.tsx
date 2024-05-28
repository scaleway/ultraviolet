import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { SwitchButton } from '../index'

export const Size: StoryFn<ComponentProps<typeof SwitchButton>> = args => (
  <Stack gap={1}>
    Small (default size): <SwitchButton {...args} size="small" />
    Medium: <SwitchButton {...args} size="medium" />
  </Stack>
)
Size.args = {
  leftButton: {
    label: 'Left Button Label',
    value: 'left',
  },
  rightButton: {
    label: 'Right Button Label',
    value: 'right',
  },
  value: 'left',
}
