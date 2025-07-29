import type { Meta } from '@storybook/react-vite'
import { Submit } from '../..'

export default {
  component: Submit,
  parameters: {
    docs: {
      description: {
        component: 'Default submit button when no one is provided',
      },
    },
  },
  title: 'Form/Components/Submit',
} as Meta

export { Playground } from './Playground.stories'
export { Invalid } from './Invalid.stories'
export { Submitting } from './Submitting.stories'
