import { Key } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Key> = props => <Key {...props} />
