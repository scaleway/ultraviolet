import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { CodeEditor } from '..'

export const Template: StoryFn<ComponentProps<typeof CodeEditor>> = ({
  ...props
}) => <CodeEditor {...props} />

Template.args = {
  label: 'Code Editor',
  extensions: 'javascript',
  height: '300px',
  readOnly: false,
  value: "console.debug('CodeEditor')",
  helper: 'Example of helper text',
}
