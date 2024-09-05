import type { StoryFn } from '@storybook/react'
import { Address } from '..'

export const Template: StoryFn<typeof Address> = args => <Address {...args} />
