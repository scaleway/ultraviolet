import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { SwitchButton } from '../index'

export const Sentiment: StoryFn<ComponentProps<typeof SwitchButton>> = args => (
  <Stack gap={1}>
    Primary:
    <SwitchButton {...args} sentiment="primary">
      <SwitchButton.Option value="option1">Option 1</SwitchButton.Option>
      <SwitchButton.Option value="option2">Option 2</SwitchButton.Option>
    </SwitchButton>
    Neutral:
    <SwitchButton {...args} sentiment="neutral">
      <SwitchButton.Option value="option1">Option 1</SwitchButton.Option>
      <SwitchButton.Option value="option2">Option 2</SwitchButton.Option>
    </SwitchButton>
  </Stack>
)

Sentiment.args = {
  value: 'option1',
}

Sentiment.parameters = {
  docs: {
    description: {
      story: 'Sentiment can be `primary` or `neutral`.',
    },
  },
}
