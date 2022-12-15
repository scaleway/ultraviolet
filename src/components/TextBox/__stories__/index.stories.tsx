import type { ComponentMeta } from '@storybook/react'
import TextBox from '..'

export default {
  component: TextBox,
  parameters: {
    docs: {
      description: {
        component: 'An enhanced text box.',
      },
    },
  },
  title: 'Components/Data Entry/TextBox',
} as ComponentMeta<typeof TextBox>

export { Playground } from './Playground.stories'
export { NoLabel } from './NoLabel.stories'
export { Placeholder } from './Placeholder.stories'
export { Sizes } from './Sizes.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
export { Valid } from './Valid.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Error } from './Error.stories'
export { Notice } from './Notice.stories'
export { ToggleablePassword } from './ToggleablePassword.stories'
export { Unit } from './Unit.stories'
export { Randomize } from './Randomize.stories'
export { ForceEdit } from './ForceEdit.stories'
export { Multiline } from './Multiline.stories'
export { DisableResize } from './DisableResize.stories'
export { TabIndex } from './TabIndex.stories'
