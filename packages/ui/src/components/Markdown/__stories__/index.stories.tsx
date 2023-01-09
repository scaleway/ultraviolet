import type { ComponentMeta } from '@storybook/react'
import Markdown from '..'

export default {
  component: Markdown,
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper for [react-markdown](https://github.com/remarkjs/react-markdown)',
      },
    },
  },
  title: 'Components/Typography/Markdown',
} as ComponentMeta<typeof Markdown>

export { Playground } from './Playground.stories'
export { Inline } from './Inline.stories'
export { LinkTarget } from './LinkTarget.stories'
export { EspaceHTML } from './EscapeHTML.stories'
