import type { Meta } from '@storybook/react-vite'
import { CodeEditor } from '..'

export default {
  component: CodeEditor,
  title: 'Plus/Compositions/CodeEditor',
} as Meta

export { Playground } from './Playground.stories'
export { AutoCompletion } from './AutoCompletion.stories'
export { Disabled } from './Disabled.stories'
export { CopyButton } from './CopyButton.stories'
