import { CodeEditor } from '..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<ComponentProps<typeof CodeEditor>> = ({
  ...props
}) => <CodeEditor {...props} />

Template.args = {
  extensions: 'js',
  height: '300px',
  helper: 'Example of helper text',
  label: 'Code Editor',
  readOnly: false,
  value: "console.debug('CodeEditor')",
}
