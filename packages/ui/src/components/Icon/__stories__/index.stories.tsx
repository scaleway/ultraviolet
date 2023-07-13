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
    deprecated: true,
    deprecatedReason:
      'This component is deprecated. Please use Icon from @ultraviolet/icons instead. The component is same but has been move on another package.',
  },
  title: 'Components/Other/Icon',
} as Meta

export { Playground } from './Playground.stories'
export { Name } from './Name.stories'
export { Size } from './Size.stories'
export { Color } from './Color.stories'
export { UnknownOrUndefined } from './UnknownOrUndefined.stories'
