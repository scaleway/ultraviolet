import type { Meta } from '@storybook/react'
import { Stack } from '..'

export default {
  component: Stack,
  title: 'Components/Layout/Stack',
} as Meta<typeof Stack>

export { Playground } from './Playground.stories'
export { Gap } from './Gap.stories'
export { Direction } from './Direction.stories'
export { AlignItems } from './AlignItems.stories'
export { JustifyContent } from './JustifyContent.stories'
