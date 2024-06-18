import type { StoryFn } from '@storybook/react'
import { Slider } from '..'
import { Stack } from '../../Stack'

export const PrefixSuffix: StoryFn<typeof Slider> = args => (
  <Stack gap={2}>
    <Slider {...args} suffix="GB" />
    <Slider {...args} prefix="+" />
  </Stack>
)

PrefixSuffix.args = { value: '3', label: 'Label' }
