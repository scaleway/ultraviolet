import type { Meta } from '@storybook/react'
import { Avatar } from '..'

export default {
  component: Avatar,
  title: 'Components/Other/Avatar',
  tags: ['deprecated'],
  parameters: {
    deprecated: true,
    deprecatedReason: 'This component is deprecated, use AvatarV2 instead.',
    migrationLink: 'Migrations/Avatar to AvatarV2',
  },
} as Meta

export { Playground } from './Playground.stories'
export { Image } from './Image.stories'
export { Size } from './Size.stories'
export { Text } from './Text.stories'
export { TextSize } from './TextSize.stories'
export { TextColor } from './TextColor.stories'
export { BackgroundColor } from './BackgroundColor.stories'
export { Lock } from './Lock.stories'
