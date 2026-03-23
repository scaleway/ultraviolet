import { CodeEditorField } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof CodeEditorField> = args => (
  <CodeEditorField {...args} />
)
