import type { Meta } from '@storybook/react'
import { TextInputV2 } from '..'

export default {
  component: TextInputV2,
  title: 'Components/Data Entry/TextInputV2',
  parameters: {
    experimental: true,
  },
  tags: ['experimental'],
} as Meta<typeof TextInputV2>

export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
export { Password } from './Password.stories'
export { OnRandomize } from './OnRandomize.stories'
export { Clearable } from './Clearable.stories'
export { Disabled } from './Disabled.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Loading } from './Loading.stories'
export { Success } from './Success.stories'
export { Error } from './Error.stories'
export { ControlledVSUncontrolled } from './ControlledVSUncontrolled.stories'
export { Examples } from './Examples.stories'
