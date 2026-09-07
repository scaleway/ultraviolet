import type { Meta } from '@storybook/react-vite'
import { CodeEditor } from '..'

export default {
  component: CodeEditor,
  title: 'Compositions/CodeEditor',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
    experimental: true,
  },
} as Meta

export { Playground } from './Playground.stories'
export { AutoCompletion } from './AutoCompletion.stories'
export { Disabled } from './Disabled.stories'
export { CopyButton } from './CopyButton.stories'
export { ExpandableHeight } from './ExpandableHeight.stories'
