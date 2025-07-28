import type { Meta } from '@storybook/react-vite'
import { Slider } from '..'

export default {
  component: Slider,
  title: 'Components/Data Entry/Slider',
} as Meta<typeof Slider>

export { Controlled } from './Controlled.stories'
export { Disabled } from './Disabled.stories'
export { Double } from './Double.stories'
export { Error } from './Error.stories'
export { Input } from './Input.stories'
export { Options } from './Options.stories'
export { Playground } from './Playground.stories'
export { PrefixSuffix } from './PrefixSuffix.stories'
export { Tooltip } from './Tooltip.stories'
