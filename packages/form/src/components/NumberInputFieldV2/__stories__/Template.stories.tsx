import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { NumberInputFieldV2 } from '..'

export const Template: StoryFn<
  ComponentProps<typeof NumberInputFieldV2>
> = args => <NumberInputFieldV2 {...args} />
