import type { Meta } from '@storybook/react'
import Image from '..'

export default {
  component: Image,
  parameters: {
    docs: {
      description: {
        component:
          'A native img html tag. You can pass props that you used to pass to the native element',
      },
    },
  },
  title: 'Components/Data Display/Image',
} as Meta

export { Playground } from './Playground.stories'
