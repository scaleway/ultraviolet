import type { Meta } from '@storybook/react'
import Icon from '..'

export default {
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: 'Allow you to display an svg icon',
      },
    },
  },
  title: 'Components/Data Display/Icon',
} as Meta

export { Playground } from './Playground.stories'
export { Name } from './Name.stories'
export { Size } from './Size.stories'
export { Color } from './Color.stories'
export { UnknownOrUndefined } from './UnknownOrUndefined.stories'
