import type { Meta } from '@storybook/react-vite'
import { CodeEditor } from '..'

export default {
  component: CodeEditor,
  title: 'Plus/Compositions/CodeEditor',
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/CodeEditor` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-codeeditor--docs).',
      },
    },
  },
} satisfies Meta

export { Playground } from './Playground.stories'
