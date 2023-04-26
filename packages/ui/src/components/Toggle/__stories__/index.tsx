import type { ComponentMeta } from '@storybook/react'
import { Toggle } from '..'

export default {
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: 'Toggle button used to give an on / off state into a form.',
      },
    },
  },
  title: 'Components/Data Entry/Toggle',
} as ComponentMeta<typeof Toggle>

export { Playground } from './Playground'
export { Label } from './Label'
export { ComplexLabel } from './ComplexLabel'
export { LabelPosition } from './LabelPosition'
export { Sizes } from './Sizes'
export { Disabled } from './Disabled'
export { Required } from './Required'
export { Tooltip } from './Tooltip'
