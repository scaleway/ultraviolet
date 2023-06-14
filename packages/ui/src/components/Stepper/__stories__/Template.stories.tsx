import type { StoryFn } from '@storybook/react'
import { Stepper } from '..'

export const Template: StoryFn<typeof Stepper> = args => <Stepper {...args} />
