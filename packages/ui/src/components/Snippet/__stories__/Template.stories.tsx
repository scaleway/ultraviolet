import { Snippet } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Snippet> = props => <Snippet {...props} />
