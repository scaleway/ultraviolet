import type { StoryFn } from '@storybook/react-vite'
import { Key } from '..'

export const Template: StoryFn<typeof Key> = props => <Key {...props} />
