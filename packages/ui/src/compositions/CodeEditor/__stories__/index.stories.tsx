import { CodeEditor } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: CodeEditor,
  title: 'Compositions/CodeEditor',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
    experimental: true,
  },
} as Meta

export { Playground } from './Playground.stories'
export { AutoCompletion } from './AutoCompletion.stories'
export { Disabled } from './Disabled.stories'
export { CopyButton } from './CopyButton.stories'
export { ExpandableHeight } from './ExpandableHeight.stories'
