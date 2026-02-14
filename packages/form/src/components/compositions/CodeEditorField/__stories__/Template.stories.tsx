import type { StoryFn } from '@storybook/react-vite'
import { CodeEditorField } from '..'

export const Template: StoryFn<typeof CodeEditorField> = args => (
  <CodeEditorField {...args} />
)
