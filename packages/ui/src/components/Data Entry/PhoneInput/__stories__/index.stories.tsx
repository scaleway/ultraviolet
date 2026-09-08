import type { Meta } from '@storybook/react-vite'
import { PhoneInput } from '..'

export default {
  component: PhoneInput,
  title: 'UI/Data Entry/PhoneInput',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: true,
      understandable: false,
      robust: true,
    },
  },
} satisfies Meta<typeof PhoneInput>

export { Playground } from './Playground.stories'
export { Default } from './Default.stories'
export { PrefilledNumber } from './PrefilledNumber.stories'
export { Disabled } from './Disabled.stories'
export { WithError } from './Error.stories'
export { Required } from './Required.stories'
export { ControlledVSUncontrolled } from './ControlledVSUncontrolled.stories'
export { WithUserControlledFormatting } from './UserControl.stories'
export { WithOnValueChange } from './UserControl.stories'
export { WithExternalValidation } from './UserControl.stories'
