import type { Meta } from '@storybook/react'
import { Slider } from '..'

export default {
  component: Slider,
  title: 'Components/Data Entry/Slider',
} as Meta<typeof Slider>

export { Playground } from './Playground.stories'
export { Double } from './Double.stories'
export { PrefixSuffix } from './PrefixSuffix.stories'
export { InteractiveSuffix } from './InteractiveSuffix.stories'
