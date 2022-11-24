import { ComponentMeta } from '@storybook/react'
import SelectableCard from '..'

export default {
  component: SelectableCard,
  parameters: {
    docs: {
      description: {
        component:
          'SelectableCard is a simple card input component with complex children.',
      },
    },
  },
  title: 'Components/Data Entry/SelectableCard',
} as ComponentMeta<typeof SelectableCard>

export { Playground } from './Playground.stories'
export { Children } from './Children.stories'
export { Controlled } from './Controlled.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { ShowTick } from './ShowTick.stories'
export { Tooltip } from './Tooltip.stories'
export { Type } from './Type.stories'
