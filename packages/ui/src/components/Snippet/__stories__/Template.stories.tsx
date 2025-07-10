import type { StoryFn } from '@storybook/react-vite'
import { Snippet } from '..'

export const Template: StoryFn<typeof Snippet> = props => <Snippet {...props} />
