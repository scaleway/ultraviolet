import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '..'

export const Template: StoryFn<typeof Stack> = props => <Stack {...props} />
