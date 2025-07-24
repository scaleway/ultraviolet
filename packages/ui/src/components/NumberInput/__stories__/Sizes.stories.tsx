import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { NumberInput } from '../index'

export const Sizes: StoryFn = (args: ComponentProps<typeof NumberInput>) => (
  <Stack gap={2}>
    {(['small', 'medium', 'large'] as const).map(size => (
      <NumberInput
        key={size}
        {...args}
        size={size}
        label={size}
        placeholder="12"
      />
    ))}
  </Stack>
)

Sizes.args = {
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
}
