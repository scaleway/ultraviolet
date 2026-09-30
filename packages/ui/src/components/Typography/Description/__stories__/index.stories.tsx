import type { Meta } from '@storybook/react-vite'
import { Description } from '..'

export default {
  component: Description,
  title: 'UI/Typography/Description',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: true,
      understandable: true,
      robust: false,
    },
  },
} satisfies Meta<typeof Description>
export { Playground } from './Playground.stories'
export { Error } from './Error.stories'
export { Success } from './Success.stories'
export { Usage } from './Usage.stories'
