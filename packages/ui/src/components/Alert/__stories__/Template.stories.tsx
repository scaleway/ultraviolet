import { Alert } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Alert> = args => <Alert {...args} />
