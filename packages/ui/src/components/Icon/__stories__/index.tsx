import type { Meta } from '@storybook/react'
import { Icon } from '..'

export default {
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: 'Allow you to display an svg icon',
      },
    },
  },
  title: 'Components/Other/Icon',
} as Meta

export { Playground } from './Playground'
export { Name } from './Name'
export { Size } from './Size'
export { Color } from './Color'
export { UnknownOrUndefined } from './UnknownOrUndefined'
