import type { Meta } from '@storybook/react'
import { Radio } from '..'

export default {
  component: Radio,
  title: 'Components/Data Entry/Radio',
} as Meta<typeof Radio>

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Helper } from './Helper.stories'
