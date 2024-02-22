import type { Meta } from '@storybook/react'
import { TextInput } from '..'

export default {
  component: TextInput,
  title: 'Components/Data Entry/TextInput',
  parameters: {
    deprecated: true,
    deprecatedReason:
      'This component is deprecated. Please use the TextInputV2 component instead.',
    migrationLink: 'Migrations/TextInput to TextInputV2',
  },
} as Meta<typeof TextInput>

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
export { ToggleableRequired } from './ToggleableRequired.stories'
export { RandomizeRequired } from './RandomizeRequired.stories'
export { UnitRequired } from './UnitRequired.stories'
export { ValidRequired } from './ValidRequired.stories'
export { MultipleRightComponents } from './MultipleRightComponents.stories'
