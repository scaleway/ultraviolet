import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { NumberInputField } from '..'

export const Template: StoryFn<
  ComponentProps<typeof NumberInputField>
> = args => <NumberInputField {...args} />
