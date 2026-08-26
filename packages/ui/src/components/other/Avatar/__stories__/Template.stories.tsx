import type { StoryFn } from '@storybook/react-vite'
import { Avatar } from '..'

export const Template: StoryFn<typeof Avatar> = args => <Avatar {...args} />
