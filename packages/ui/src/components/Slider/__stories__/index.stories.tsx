import type { Meta } from '@storybook/react-vite'
import { Slider } from '..'

export default {
  component: Slider,
  title: 'Components/Data Entry/Slider',
} as Meta<typeof Slider>

export { Playground } from './Playground.stories'
export { Double } from './Double.stories'
export { Input } from './Input.stories'
export { Error } from './Error.stories'
export { Disabled } from './Disabled.stories'
export { Options } from './Options.stories'
export { PrefixSuffix } from './PrefixSuffix.stories'
export { Tooltip } from './Tooltip.stories'
export { Controlled } from './Controlled.stories'
