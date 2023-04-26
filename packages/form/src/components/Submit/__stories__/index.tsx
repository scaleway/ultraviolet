import type { Meta } from '@storybook/react'
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

export { Playground } from './Playground'
export { Invalid } from './Invalid'
export { Submitting } from './Submitting'
