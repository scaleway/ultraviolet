import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Text } from '../index'

export const Template: Story<ComponentProps<typeof Text>> = args => (
  <Text {...args} />
)
