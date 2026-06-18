import type { Meta } from '@storybook/react-vite'
import { CodeEditor } from '..'

export default {
  component: CodeEditor,
  title: 'Compositions/CodeEditor',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
    experimental: true,
  },
} as Meta

export { Playground } from './Playground.stories'
export { AutoCompletion } from './AutoCompletion.stories'
export { Disabled } from './Disabled.stories'
export { CopyButton } from './CopyButton.stories'
export { OnClick } from './OnClick.stories'
export { ExpandableHeight } from './ExpandableHeight.stories'
