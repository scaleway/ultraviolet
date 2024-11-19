import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SwitchButtonField } from '..'

export const Template: StoryFn<
  ComponentProps<typeof SwitchButtonField>
> = args => <SwitchButtonField {...args} />
