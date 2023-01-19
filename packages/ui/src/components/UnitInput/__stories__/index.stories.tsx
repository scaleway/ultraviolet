import type { ComponentMeta } from '@storybook/react'
import { UnitInput } from '..'

export default {
  component: UnitInput,
  parameters: {
    docs: {
      description: {
        component:
          'UnitInput is a component made out of 2 components: a **TextInput** and a **RichSelect**.',
      },
    },
  },
  title: 'Components/Data Entry/UnitInput',
} as ComponentMeta<typeof UnitInput>

export { Playground } from './Playground.stories'
export { CustomOptions } from './CustomOptions.stories'
export { Sizes } from './Sizes.stories'
export { Disabled } from './Disabled.stories'
