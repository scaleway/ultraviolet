import type { Meta } from '@storybook/react-vite'
import { Slider } from '..'

export default {
  component: Slider,
  title: 'UI/Data Entry/Slider',
  parameters: {
    a11yStatus: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
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
export { MinMax } from './MinMax.stories'
