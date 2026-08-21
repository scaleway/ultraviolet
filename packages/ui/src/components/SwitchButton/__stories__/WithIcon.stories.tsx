import type { StoryFn } from '@storybook/react-vite'
import { MoonIcon } from '@ultraviolet/icons/MoonIcon'
import { SunIcon } from '@ultraviolet/icons/SunIcon'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { VisuallyHidden } from '../../VisuallyHidden'
import { SwitchButton } from '../index'

export const WithIcon: StoryFn<ComponentProps<typeof SwitchButton>> = args => (
  <SwitchButton {...args} size="small">
    <SwitchButton.Option value="option1">
      <Stack alignItems="center" direction="row">
        <VisuallyHidden>Light mode</VisuallyHidden>
        <SunIcon />
      </Stack>
    </SwitchButton.Option>
    <SwitchButton.Option value="option2">
      <Stack alignItems="center" direction="row">
        <VisuallyHidden>Dark mode</VisuallyHidden>
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
      story:
        'It is possible to have an icon instead of the label. **Do not forget to add an accessible label** (using component `VisuallyHidden`)',
    },
  },
}
