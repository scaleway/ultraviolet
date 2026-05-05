import { Slider } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Slider,
  title: 'UI/Data Entry/Slider',
  parameters: {
    a11y: 'partial',
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
