import type { ComponentMeta } from '@storybook/react'
import { BorderedBox } from '..'

export default {
  component: BorderedBox,
  title: 'Components/Layout/BorderedBox',
  parameters: {
    deprecated: true,
    deprecatedReason:
      'BorderedBox and Containers where quite similar they have been merged into a single component called Card, use this component instead.',
  },
} as ComponentMeta<typeof BorderedBox>

export { Playground } from './Playground.stories'
