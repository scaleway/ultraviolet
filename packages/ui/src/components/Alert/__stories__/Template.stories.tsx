import type { StoryFn } from '@storybook/react'
import { Alert } from '..'

export const Template: StoryFn<typeof Alert> = args => <Alert {...args} />
