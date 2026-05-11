import type { StoryFn } from '@storybook/react-vite'
import { Alert } from '..'

export const Template: StoryFn<typeof Alert> = args => <Alert {...args} />
