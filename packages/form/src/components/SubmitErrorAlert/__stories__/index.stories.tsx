import type { Meta } from '@storybook/react'
import { SubmitErrorAlert } from '../..'

export default {
  component: SubmitErrorAlert,
  parameters: {
    docs: {
      description: {
        component:
          'This component is used to display error message after a form submission',
      },
    },
  },
  title: 'Form/Components/SubmitErrorAlert',
} as Meta

export { Playground } from './Playground.stories'
