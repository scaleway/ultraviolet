import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { CodeEditorField } from '..'
import { Submit } from '../../../components/Submit'

export const Required: StoryFn<ComponentProps<typeof CodeEditorField>> = args => (
  <Stack gap={1}>
    <CodeEditorField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  label: 'This CodeEditor is required',
  name: 'required-code-editor',
  required: true,
  extensions: 'js',
}
