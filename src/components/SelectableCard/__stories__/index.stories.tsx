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

export { Playground } from './Playground'
export { Children } from './Children'
export { Controlled } from './Controlled'
export { Disabled } from './Disabled'
export { Error } from './Error'
export { ShowTick } from './ShowTick'
export { Tooltip } from './Tooltip'
export { Type } from './Type'
