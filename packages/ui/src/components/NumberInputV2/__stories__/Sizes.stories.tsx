import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { NumberInputV2 } from '../index'

export const Sizes: StoryFn = (args: ComponentProps<typeof NumberInputV2>) => (
  <Stack gap={2}>
    {(['small', 'medium', 'large'] as const).map(size => (
      <NumberInputV2 key={size} {...args} size={size} label={size} />
    ))}
  </Stack>
)

Sizes.args = {
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
}
