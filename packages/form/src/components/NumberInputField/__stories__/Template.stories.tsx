import { NumberInputField } from '..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<
  ComponentProps<typeof NumberInputField>
> = args => <NumberInputField {...args} />
