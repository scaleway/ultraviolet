import type { ComponentMeta } from '@storybook/react'
import { TextInput } from '..'

export default {
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component:
          'TextInput component allows users to input text, with options for customization and validation. It supports various input types and should be appropriately sized with clear labeling.',
      },
    },
  },
  title: 'Components/Data Entry/TextInput',
} as ComponentMeta<typeof TextInput>

export { Playground } from './Playground'
export { NoLabel } from './NoLabel'
export { Placeholder } from './Placeholder'
export { Sizes } from './Sizes'
export { Disabled } from './Disabled'
export { Required } from './Required'
export { Valid } from './Valid'
export { ReadOnly } from './ReadOnly'
export { Error } from './Error'
export { Notice } from './Notice'
export { ToggleablePassword } from './ToggleablePassword'
export { Unit } from './Unit'
export { Randomize } from './Randomize'
export { ForceEdit } from './ForceEdit'
export { Multiline } from './Multiline'
export { DisableResize } from './DisableResize'
export { TabIndex } from './TabIndex'
export { ToggleableRequired } from './ToggleableRequired'
export { RandomizeRequired } from './RandomizeRequired'
export { UnitRequired } from './UnitRequired'
export { ValidRequired } from './ValidRequired'
export { MultipleRightComponents } from './MultipleRightComponents'
