import { PhoneInput } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: PhoneInput,
  title: 'Components/Data Entry/PhoneInput',
} as Meta<typeof PhoneInput>

export { Playground } from './Playground.stories'
export { Default } from './Default.stories'
export { PrefilledNumber } from './PrefilledNumber.stories'
export { Disabled } from './Disabled.stories'
export { WithError } from './Error.stories'
export { Required } from './Required.stories'
export { ControlledVSUncontrolled } from './ControlledVSUncontrolled.stories'
