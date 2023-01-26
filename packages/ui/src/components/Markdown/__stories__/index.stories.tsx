import type { ComponentMeta } from '@storybook/react'
import { Markdown } from '..'

export default {
  component: Markdown,
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper for [react-markdown](https://github.com/remarkjs/react-markdown)',
      },
    },
    deprecated: true,
    deprecatedReason: 'This component is deprecated please use Text instead.',
  },
  title: 'Components/Typography/Markdown',
} as ComponentMeta<typeof Markdown>

export { Playground } from './Playground.stories'
export { Inline } from './Inline.stories'
export { LinkTarget } from './LinkTarget.stories'
export { EscapeHTML } from './EscapeHTML.stories'
