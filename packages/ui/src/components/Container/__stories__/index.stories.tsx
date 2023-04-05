import type { Meta } from '@storybook/react'
import { Container } from '..'

export default {
  component: Container,
  title: 'Components/Layout/Container',
  parameters: {
    deprecated: true,
    deprecatedReason:
      'BorderedBox and Containers where quite similar they have been merged into a single component called Card, use this component instead.',
  },
} as Meta

export { Playground } from './Playground.stories'
export { Title } from './Title.stories'
export { Subtitle } from './Subtitle.stories'
export { RightTitle } from './RightTitle.stories'
export { Header } from './Header.stories'
export { Small } from './Small.stories'
export { Edition } from './Edition.stories'
export { Disabled } from './Disabled.stories'
