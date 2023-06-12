import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SelectableCardField } from '..'

export const Template: StoryFn<
  ComponentProps<typeof SelectableCardField>
> = args => <SelectableCardField {...args}>Radio</SelectableCardField>
